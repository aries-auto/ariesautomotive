import SearchActions from '../actions/SearchActions';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

const KEY = apiKey;

const SearchSource = {
	fetchSearchResults() {
		return {
			remote(st, term, page) {
				return new Promise((res, rej) => {
					fetch(`${apiBase}/search/${term}?key=${KEY}&brandID=${brand.id}&page=${page}`)
					.then((resp) => {
						return resp.json();
					}).then((data) => {
						if (st.searchResults && st.searchTerm === term) {
							let tmpData = [];
							tmpData = st.searchResults.hits.hits.concat(data.hits.hits);
							data.hits.hits = tmpData;
						}
						res([data, term, page]);
					}).catch(rej);
				});
			},

			local(st, term) {
				if ((st.searchTerm !== term || !st.searchResults)) {
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
