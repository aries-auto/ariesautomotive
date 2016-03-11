import AppDispatcher from '../dispatchers/AppDispatcher';

class VehicleActions {
	constructor() {
		this.generateActions('getCategoryStyles', 'set', 'addChangeListener', 'updateVehicleStyle', 'setShowStyleState', 'setCategoryParts', 'setCategory', 'setParts');
	}
}

export default AppDispatcher.createActions(VehicleActions);
