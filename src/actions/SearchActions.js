import AppDispatcher from '../dispatchers/AppDispatcher';

class SearchActions {
	constructor() {
		this.generateActions(
			'fetchSearchResults',
			'updateSearchResults',
			'failedSearchResults',
			'loadingSearchResults',
		);
	}
}

export default AppDispatcher.createActions(SearchActions);
