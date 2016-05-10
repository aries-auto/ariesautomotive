import AppDispatcher from '../dispatchers/AppDispatcher';

class ContactActions {
	constructor() {
		this.generateActions('getCountries', 'getContactTypes', 'postContactData');
	}
}

export default AppDispatcher.createActions(ContactActions);
