import VehicleActions from '../actions/VehicleActions';
import fetch from '../core/fetch';
import { apiBase, iapiBase, apiKey, brand } from '../config';

const KEY = apiKey;

const VehicleSource = {
	fetchVehicle() {
		return {
			remote(st, year, make, model) {
				let path = `${apiBase}/vehicle/category`;

				if (year && year !== '') {
					path = `${path}/${year}`;
				}
				if (make && make !== '') {
					path = `${path}/${make}`;
				}
				if (model && model !== '') {
					path = `${path}/${model}`;
				}

				return new Promise((res, rej) => {
					fetch(`${path}?key=${KEY}&brandID=${brand.id}`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st, args) {
				if (!args && (!st.vehicle.availableYears || st.vehicle.availableYears.length === 0)) {
					return null;
				} else if (args) {
					if (args[0] && args[0] !== st.vehicle.base.year) {
						return null;
					}
					if (args[1] && args[1] !== st.vehicle.base.make) {
						return null;
					}
					if (args[2] && args[2] !== st.vehicle.base.model) {
						return null;
					}
				}
				return st.vehicle;
			},

			success: VehicleActions.updateVehicle,
			error: VehicleActions.failedVehicle,
			loading: VehicleActions.fetchVehicle,
		};
	},

	fetchEnvision() {
		return {
			remote(st, year, make, model, colorID, identifiers) {
				return new Promise((res, rej) => {
					fetch(`${iapiBase}/envision/image?year=${year}&make=${make}&model=${model}&colorID=${colorID || ''}&skus=${identifiers || ''}&key=${KEY}`)
					.then((resp) => {
						return resp.json();
					}).then((data) => {
						res({ resp: data, colorID, identifiers });
					}).catch(rej);
				});
			},

			local(st, year, make, model, colorID, identifiers) {
				if (!st.envision.image || !st.envision.vehicle) {
					return null;
				}

				if (year !== st.envision.vehicle.year) {
					return null;
				}
				if (make !== st.envision.vehicle.make) {
					return null;
				}
				if (model !== st.envision.vehicle.model) {
					return null;
				}

				if (colorID !== st.envision.colorID) {
					return null;
				}

				const stJS = JSON.stringify(st.envision.layers || []);
				const currentJS = JSON.stringify(identifiers);
				if (stJS.localeCompare(currentJS) !== 0) {
					return null;
				}

				return st.envision;
			},

			success: VehicleActions.updateEnvision,
			error: VehicleActions.failedEnvision,
			loading: VehicleActions.loadingEnvision,
		};
	},

	fetchFitments() {
		return {
			remote(st, result, style) {
				let fits = [];
				// map fitments for all style options that fit the supplied style
				// to back into the array.
				result.style_options
				.filter((so) => so.style.toLowerCase() === style.toLowerCase())
				.map((so) => {
					// push all fitment data into the array
					fits = fits.concat(
						so.fitments
					);
				});
				return new Promise((res, rej) => {
					if (result.category.id === 320) {
						fetch(`${apiBase}/category/320/parts?key=${KEY}`)
						.then((resp) => {
							return resp.json();
						/* eslint-disable no-loop-func */
						}).then((data) => {
							const seatFits = [];
							data.parts.map((p) => {
								const tmp = {
									product: p,
									product_identifier: p.part_number,
								};
								seatFits.push(tmp);
							});
							res(seatFits);
						}).catch(rej);
						return;
					}

					const ids = [];
					for (let i = 0; i < fits.length; i++) {
						const ft = fits[i];
						if (!ft.product_identifier) {
							continue;
						}

						ids.push(ft.product_identifier);
					}
					fetch(
						`${apiBase}/part/multi?key=${KEY}&brandID=${brand.id}`,
						{
							method: 'post',
							headers: {
								'Accept': 'application/json',
							},
							body: JSON.stringify(ids),
						},
					)
					.then((resp) => {
						return resp.json();
					/* eslint-disable no-loop-func */
					}).then((parts) => {
						parts.map((p) => {
							fits.map((f, j) => {
								if (f.product_identifier === p.part_number) {
									fits[j].product = p;
									if (fits.every((t) => t.product)) {
										res(fits);
									}
								}
							});
						});
					}).catch(rej);
				});
			},

			local(st, result, style) {
				const id = result.category.id;
				let fits = [];

				if (result.category.id === 320) {
					if (st.fitments.length === 0) {
						st.fitments = null;
						return null;
					}
					return st.fitments;
				}

				// map fitments for all style options that fit the supplied style
				// to back into the array.
				result.style_options
				.filter((so) => so.style.toLowerCase() === style.toLowerCase())
				.map((so) => {
					// push all fitment data into the array
					fits = fits.concat(
						so.fitments
					);
				});

				if (!st.fitments[id] || fits.length > 0) {
					return null;
				}

				st.fitments.sort((a, b) => a.product_identifier > b.product_identifier);
				fits.sort((a, b) => a.product_identifier > b.product_identifier);

				let same = true;
				st.fitments.map((ft, i) => {
					if (!fits[i] || fits[i].product_identifier !== ft.product_identifier) {
						same = false;
					}
				});

				if (!same) {
					return null;
				}

				return st.fitments[id];
			},

			success: VehicleActions.updateFitments,
			error: VehicleActions.failedFitments,
			loading: VehicleActions.fetchFitments,
		};
	},
};

module.exports = VehicleSource;
