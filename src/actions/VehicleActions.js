import AppDispatcher from '../dispatchers/AppDispatcher';

class VehicleActions {
	constructor() {
		this.generateActions(
			'setActiveIndex',
			'setStyle',

			'fetchVehicle',
			'updateVehicle',
			'failedVehicle',

			'fetchEnvision',
			'updateEnvision',
			'failedEnvision',
			'setEnvisionColor',
			'setEnvisionVehicle',
			'addEnvisionPart',
			'removeEnvisionPart',

			'fetchFitments',
			'updateFitments',
			'failedFitments',

			'set',
			'setShowStyleState',
			'setLookupCategories');
	}
}

export default AppDispatcher.createActions(VehicleActions);
