import AppDispatcher from '../dispatchers/AppDispatcher';

class WarrantiesActions {
	constructor() {
		this.generateActions('setFormValidation');
	}
}

export default AppDispatcher.createActions(WarrantiesActions);
