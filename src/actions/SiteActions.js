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

			'fetchContentMenus',
			'updateContentMenus',
			'failedContentMenus',

			'fetchPageData',
			'updatePageData',
			'failedPageData',
		);
	}
}

export default AppDispatcher.createActions(SiteActions);
