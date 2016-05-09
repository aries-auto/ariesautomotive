import AppDispatcher from '../dispatchers/AppDispatcher';

class PartActions {
	constructor() {
		this.generateActions('get', 'featured', 'setCarouselIndex', 'setVideo');
	}
}

export default AppDispatcher.createActions(PartActions);
