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

			'setActiveImage',
			'setActiveVideo',
		);
	}
}

export default AppDispatcher.createActions(ProductActions);
