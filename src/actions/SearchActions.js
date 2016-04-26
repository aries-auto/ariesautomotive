import AppDispatcher from '../dispatchers/AppDispatcher';

class SearchActions {
	constructor() {
		this.generateActions('search', 'setResult');
	}
}

export default AppDispatcher.createActions(SearchActions);
