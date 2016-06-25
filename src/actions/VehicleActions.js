import AppDispatcher from '../dispatchers/AppDispatcher';

class VehicleActions {
	constructor() {
		this.generateActions('getCategoryStyles', 'set', 'setShowStyleState', 'setActiveCategory', 'setStyle', 'addPartToVehicle', 'removePartFromVehicle', 'setShowIconMediaVehicleState', 'setIconMediaVehicle');
	}
}

export default AppDispatcher.createActions(VehicleActions);
