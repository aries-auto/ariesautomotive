import AppDispatcher from '../dispatchers/AppDispatcher';

class SiteActions {
	constructor() {
		this.generateActions(
			'fetchTestimonials',
			'updateTestimonials',
			'failedTestimonials',

			'fetchLandingPage',
			'updateLandingPage',
			'failedLandingPage',

			'fetchNewsItem',
			'updateNewsItem',
			'failedNewsItem',
		);
	}
}

export default AppDispatcher.createActions(SiteActions);
