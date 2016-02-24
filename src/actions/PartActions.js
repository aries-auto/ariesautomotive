import AppDispatcher from '../dispatchers/AppDispatcher';

class PartActions {
	constructor() {
		this.generateActions('get', 'featured');
	}
}

export default AppDispatcher.createActions(PartActions);
