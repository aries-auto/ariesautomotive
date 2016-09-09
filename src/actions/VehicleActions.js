import AppDispatcher from '../dispatchers/AppDispatcher';

class VehicleActions {
	constructor() {
		this.generateActions(
			'setActiveIndex',
			'setStyle',

			'fetchVehicle',
			'updateVehicle',
			'failedVehicle',

			'fetchFitments',
			'updateFitments',
			'failedFitments',
		);
	}
}

export default AppDispatcher.createActions(VehicleActions);
