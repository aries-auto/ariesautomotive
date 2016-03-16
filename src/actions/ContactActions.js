import AppDispatcher from '../dispatchers/AppDispatcher';

class ContactActions {
	constructor() {
		this.generateActions('getCountries');
	}
}

export default AppDispatcher.createActions(ContactActions);
