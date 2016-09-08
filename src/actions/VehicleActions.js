import AppDispatcher from '../dispatchers/AppDispatcher';

class VehicleActions {
	constructor() {
		this.generateActions(
			'setActiveIndex',

			'fetchVehicle',
			'updateVehicle',
			'failedVehicle',
		);
	}
}

export default AppDispatcher.createActions(VehicleActions);
