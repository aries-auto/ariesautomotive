import AppDispatcher from '../dispatchers/AppDispatcher';

class BuyActions {
	constructor() {
		this.generateActions('setLocal', 'bounds', 'setMarkers', 'online', 'setModal', 'setOrigin', 'showDirections', 'direction', 'getDirections');
	}
}

export default AppDispatcher.createActions(BuyActions);
