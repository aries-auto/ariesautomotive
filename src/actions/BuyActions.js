import AppDispatcher from '../dispatchers/AppDispatcher';

class BuyActions {
	constructor() {
		this.generateActions('setLocal');
	}
}

export default AppDispatcher.createActions(BuyActions);
