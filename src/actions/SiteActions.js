import AppDispatcher from '../dispatchers/AppDispatcher';

class SiteActions {
	constructor() {
		this.generateActions(
			'fetchTestimonials',
			'updateTestimonials',
			'failedTestimonials',
		);
	}
}

export default AppDispatcher.createActions(SiteActions);
