import SearchActions from '../actions/SearchActions';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

const KEY = apiKey;

const SearchSource = {
	fetchSearchResults() {
		return {
			remote(st, term) {
				return new Promise((res, rej) => {
					fetch(`${apiBase}/search/${term}?key=${KEY}&brandID=${brand.id}`)
					.then((resp) => {
						return resp.json();
					}).then((data) => res([data, term])).catch(rej);
				});
			},

			local(st, term) {
				if (st.searchTerm !== term || (!st.searchResults || !st.searchResults.length)) {
					return null;
				}

				return st.searchResults;
			},

			shouldFetch(st) {
				return !st.loading;
			},

			success: SearchActions.updateSearchResults,
			error: SearchActions.failedSearchResults,
			loading: SearchActions.loadingSearchResults,
		};
	},
};

module.exports = SearchSource;
