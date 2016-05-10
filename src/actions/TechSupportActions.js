import AppDispatcher from '../dispatchers/AppDispatcher';

class TechSupportActions {
	constructor() {
		this.generateActions('postContactData');
	}
}

export default AppDispatcher.createActions(TechSupportActions);
