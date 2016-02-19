import AppDispatcher from '../dispatchers/AppDispatcher';

class VehicleActions {
	constructor() {
		this.generateActions('getCategoryStyles', 'set', 'addChangeListener');
	}
}

export default AppDispatcher.createActions(VehicleActions);
