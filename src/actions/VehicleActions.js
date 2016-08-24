import AppDispatcher from '../dispatchers/AppDispatcher';

class VehicleActions {
	constructor() {
		this.generateActions(
			'getCategoryStyles',
			'set',
			'setShowStyleState',
			'setActiveCategory',
			'setStyle',
			'setLookupCategories',

			'fetchVehicle',
			'updateVehicle',
			'failedVehicle',
		);
	}
}

export default AppDispatcher.createActions(VehicleActions);
