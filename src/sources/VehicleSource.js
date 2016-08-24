import VehicleActions from '../actions/VehicleActions';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

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
};

module.exports = VehicleSource;
