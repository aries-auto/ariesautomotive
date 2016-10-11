import AppDispatcher from '../dispatchers/AppDispatcher';

class LuverneActions {
	constructor() {
		this.generateActions(
			'setActiveIndex',
			'setStyle',

			'fetchVehicle',
			'updateVehicle',
			'failedVehicle',

			'setProducts',

			'fetchFitments',
			'fetchParts',
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

export default AppDispatcher.createActions(LuverneActions);
