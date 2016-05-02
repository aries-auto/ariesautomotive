import AppDispatcher from '../dispatchers/AppDispatcher';

class FormFieldActions {
	constructor() {
		this.generateActions('setValidation', 'setInput');
	}
}

export default AppDispatcher.createActions(FormFieldActions);
