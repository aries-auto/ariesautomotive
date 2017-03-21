import AppDispatcher from '../dispatchers/AppDispatcher';

class AppGuideActionsLuverne {
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

export default AppDispatcher.createActions(AppGuideActionsLuverne);
