import AppDispatcher from '../dispatchers/AppDispatcher';

class CategoryActions {
	constructor() {
		this.generateActions('getCats');
	}
}

export default AppDispatcher.createActions(CategoryActions);
