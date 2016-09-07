import ContactActions from '../actions/ContactActions';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

const KEY = apiKey;

const ContactSource = {
	fetchTypes() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`${apiBase}/contact/types?key=${KEY}&brandID=${brand.id}`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.contactTypes || !st.contactTypes.length) {
					return null;
				}

				return st.contactTypes;
			},

			success: ContactActions.updateTypes,
			error: ContactActions.failedTypes,
			loading: ContactActions.fetchTypes,
		};
	},
};

module.exports = ContactSource;
