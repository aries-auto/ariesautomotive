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

			'setProducts',
			'failedProducts',
		);
	}
}

export default AppDispatcher.createActions(CategoryActions);
