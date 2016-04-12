import AppDispatcher from '../dispatchers/AppDispatcher';

class BuyActions {
	constructor() {
		this.generateActions('setLocal', 'bounds', 'setMarkers', 'online');
	}
}

export default AppDispatcher.createActions(BuyActions);
