import AppDispatcher from '../dispatchers/AppDispatcher';

class CategoryActions {
	constructor() {
		this.generateActions(
			'fetchCategories',
			'updateCategories',
			'failedCategories',
		);
	}
}

export default AppDispatcher.createActions(CategoryActions);
