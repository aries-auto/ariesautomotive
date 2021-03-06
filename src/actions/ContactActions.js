import AppDispatcher from '../dispatchers/AppDispatcher';

class ContactActions {
	constructor() {
		this.generateActions(
			'fetchTypes',
			'updateTypes',
			'failedTypes',
			'setInput',
			'postContactData',
			'setFormValidation',
		);
	}
}

export default AppDispatcher.createActions(ContactActions);
