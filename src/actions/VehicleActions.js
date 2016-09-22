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
			'set',
			'setShowStyleState',
			'addPartToVehicle',
			'removePartFromVehicle',
			'setIconParts',
			'setLookupCategories');
	}
}

export default AppDispatcher.createActions(VehicleActions);
