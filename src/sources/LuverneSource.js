import LuverneActions from '../actions/LuverneActions';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

const KEY = apiKey;

const LuverneSource = {
	fetchVehicle() {
		return {
			remote(st, year, make, model) {
				let path = `${apiBase}/luverne/vehicle`;

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
				if (!args && (!st.vehicle.available_years || st.vehicle.available_years.length === 0)) {
					return null;
				} else if (args) {
					if (args[0] && args[0] !== st.vehicle.base_vehicle.year) {
						return null;
					}
					if (args[1] && args[1] !== st.vehicle.base_vehicle.make) {
						return null;
					}
					if (args[2] && args[2] !== st.vehicle.base_vehicle.model) {
						return null;
					}
				}
				return st.vehicle;
			},

			success: LuverneActions.updateVehicle,
			error: LuverneActions.failedVehicle,
			loading: LuverneActions.fetchVehicle,
		};
	},

	fetchFitments() {
		return {
			remote(st, prods) {
				const fits = [];
				return new Promise((res, rej) => {
					fetch(
						`${apiBase}/part/multi?key=${KEY}&brandID=${brand.id}`,
						{
							method: 'post',
							headers: {
								'Accept': 'application/json',
							},
							body: JSON.stringify(prods),
						},
					)
					.then((resp) => {
						return resp.json();
					/* eslint-disable no-loop-func */
					}).then((parts) => {
						if (parts === null) {
							return;
						}
						parts.map((p) => {
							fits.push(p);
						});
						res(fits);
					}).catch(rej);
				});
			},

			local(st, prods) {
				const fits = [];

				if (!st.fitments || st.fitments.length === 0) {
					return null;
				}

				st.fitments.sort((a, b) => a.part_number > b.part_number);

				st.fitments.map((ft) => {
					prods.map((p) => {
						if (ft.part_number === p) {
							fits.concat(ft);
						}
					});
				});

				if (fits.length === 0) {
					return null;
				}

				return fits;
			},

			success: LuverneActions.updateFitments,
			error: LuverneActions.failedFitments,
			loading: LuverneActions.fetchFitments,
		};
	},
};


module.exports = LuverneSource;
