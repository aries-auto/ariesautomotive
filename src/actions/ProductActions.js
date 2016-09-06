import AppDispatcher from '../dispatchers/AppDispatcher';

class ProductActions {
	constructor() {
		this.generateActions(
			'fetchFeatured',
			'updateFeatured',
			'failedFeatured',

			'fetchProduct',
			'updateProduct',
			'failedProduct',
		);
	}
}

export default AppDispatcher.createActions(ProductActions);
