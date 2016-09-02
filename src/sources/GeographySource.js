import GeographyActions from '../actions/GeographyActions';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';

const KEY = apiKey;

const GeographySource = {
	fetchCountries() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`${apiBase}/geography/countrystates?key=${KEY}`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.countries || !st.countries.length) {
					return null;
				}

				return st.countries;
			},

			success: GeographyActions.updateCountries,
			error: GeographyActions.failedCountries,
			loading: GeographyActions.fetchCountries,
		};
	},
};

module.exports = GeographySource;
