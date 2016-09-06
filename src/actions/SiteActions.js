import AppDispatcher from '../dispatchers/AppDispatcher';

class ProductActions {
	constructor() {
		this.generateActions(
			'fetchFeatured',
			'updateFeatured',
			'failedFeatured',
		);
	}
}

export default AppDispatcher.createActions(ProductActions);
