import AppDispatcher from '../dispatchers/AppDispatcher';

class VehicleActions {
	constructor() {
		this.generateActions('getCategoryStyles', 'set', 'setShowStyleState', 'setActiveCategory', 'setStyle', 'setLookupCategories');
	}
}

export default AppDispatcher.createActions(VehicleActions);
