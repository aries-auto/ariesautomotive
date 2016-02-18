import AppDispatcher from '../dispatchers/AppDispatcher';

class LookupActions {
	constructor(){
		this.generateActions('get', 'set');
	}
}

export default AppDispatcher.createActions(LookupActions);
