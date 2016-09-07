import AppDispatcher from '../dispatchers/AppDispatcher';

class ContactActions {
	constructor() {
		this.generateActions(
			'fetchTypes',
			'updateTypes',
			'failedTypes',
			'setInput',
		);
	}
}

export default AppDispatcher.createActions(ContactActions);
