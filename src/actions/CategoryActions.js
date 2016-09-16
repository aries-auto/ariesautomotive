import AppDispatcher from '../dispatchers/AppDispatcher';

class CategoryActions {
	constructor() {
		this.generateActions(
			'fetchCategories',
			'updateCategories',
			'failedCategories',

			'fetchCategory',
			'updateCategory',
			'failedCategory',
		);
	}
}

export default AppDispatcher.createActions(CategoryActions);
