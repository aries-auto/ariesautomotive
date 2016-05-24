import AppDispatcher from '../dispatchers/AppDispatcher';

class AppGuideActions {
	constructor() {
		this.generateActions('all', 'set', 'reset', 'setPage', 'getApplicationGuides');
	}
}

export default AppDispatcher.createActions(AppGuideActions);
