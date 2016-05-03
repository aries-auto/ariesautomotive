import AppDispatcher from '../dispatchers/AppDispatcher';

class WarrantiesActions {
	constructor() {
		this.generateActions('setFields', 'postData');
	}
}

export default AppDispatcher.createActions(WarrantiesActions);
