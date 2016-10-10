import AppDispatcher from '../dispatchers/AppDispatcher';

class AppGuideActions {
	constructor() {
		this.generateActions(
			'set',
			'reset',
			'setPage',
			'fetchAppGuides',
			'updateAppGuides',
			'failedAppGuides',
			'fetchAppGuide',
			'updateAppGuide',
			'failedAppGuide'
		);
	}
}

export default AppDispatcher.createActions(AppGuideActions);
