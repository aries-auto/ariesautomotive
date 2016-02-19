import AppDispatcher from '../dispatchers/AppDispatcher';

class NewsActions {
	constructor() {
		this.generateActions('get');
	}
}

export default AppDispatcher.createActions(NewsActions);
