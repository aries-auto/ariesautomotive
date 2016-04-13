import AppDispatcher from '../dispatchers/AppDispatcher';

class BuyActions {
	constructor() {
		this.generateActions('setLocal', 'bounds', 'setMarkers', 'online', 'setModal', 'setStartingLocation', 'setLocation');
	}
}

export default AppDispatcher.createActions(BuyActions);
