import AppDispatcher from '../dispatchers/AppDispatcher';

class PartActions {
	constructor() {
		this.generateActions('get');
	}
}

export default AppDispatcher.createActions(PartActions);
