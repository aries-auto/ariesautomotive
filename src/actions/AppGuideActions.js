import AppDispatcher from '../dispatchers/AppDispatcher';

class AppGuideActions {
	constructor() {
		this.generateActions(
			'all',
			'set',
			'reset',
			'setPage',
			'getApplicationGuides',
			'fetchAppGuides',
			'updateAppGuides',
			'failedAppGuides'
		);
	}
}

export default AppDispatcher.createActions(AppGuideActions);
