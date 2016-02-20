import AppDispatcher from '../dispatchers/AppDispatcher';

class NewsActions {
	constructor() {
		this.generateActions('get', 'all');
	}
}

export default AppDispatcher.createActions(NewsActions);
