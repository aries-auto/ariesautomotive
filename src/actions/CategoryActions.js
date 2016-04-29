import AppDispatcher from '../dispatchers/AppDispatcher';

class CategoryActions {
	constructor() {
		this.generateActions();
	}
}

export default AppDispatcher.createActions(CategoryActions);
