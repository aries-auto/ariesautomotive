import AppDispatcher from '../dispatchers/AppDispatcher';

class PartActions {
	constructor() {
		this.generateActions('get', 'featured', 'setCarouselIndex');
	}
}

export default AppDispatcher.createActions(PartActions);
