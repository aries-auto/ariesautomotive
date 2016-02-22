import AppDispatcher from '../dispatchers/AppDispatcher';

class AppGuideActions {
	constructor() {
		this.generateActions('get', 'all');
	}
}

export default AppDispatcher.createActions(AppGuideActions);
