import AppDispatcher from '../dispatchers/AppDispatcher';

class PartActions {
	constructor() {
		this.generateActions('get', 'featured', 'setCarouselIndex', 'setVideo', 'setPart');
	}
}

export default AppDispatcher.createActions(PartActions);
