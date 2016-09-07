import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import SiteActions from '../actions/SiteActions';
import SiteSource from '../sources/SiteSource';

const EventEmitter = events.EventEmitter;

class SiteStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			testimonials: [],
			landingPage: {},
			newsItem: {},
		};

		this.bindListeners({
			handleUpdateTestimonials: SiteActions.UPDATE_TESTIMONIALS,
			handleFailedTestimonials: SiteActions.FAILED_TESTIMONIALS,
			handleUpdateLandingPage: SiteActions.UPDATE_LANDING_PAGE,
			handleFailedLandingPage: SiteActions.FAILED_LANDING_PAGE,
			handleUpdateNewsItem: SiteActions.UPDATE_NEWS_ITEM,
			handleFailedNewsItem: SiteActions.FAILED_NEWS_ITEM,
		});

		this.exportPublicMethods({
			getTestimonials: this.getTestimonials,
			getLandingPage: this.getLandingPage,
			getNewsItem: this.getNewsItem,
		});

		this.exportAsync(SiteSource);
	}

	handleUpdateTestimonials(testimonials) {
		if (testimonials && (!this.state.testimonials || testimonials.length > this.state.testimonials.length)) {
			this.setState({
				testimonials,
				error: null,
			});
		}
	}

	handleFailedTestimonials(err) {
		this.setState({
			error: err,
		});
	}

	getTestimonials() {
		return this.state.testimonials;
	}

	handleUpdateLandingPage(lp) {
		if (lp && (!this.state.landingPage || lp.Id !== this.state.landingPage.Id)) {
			this.setState({
				landingPage: lp,
				error: null,
			});
		}
	}

	handleFailedLandingPage(err) {
		this.setState({
			error: err,
		});
	}

	getLandingPage() {
		return this.state.landingPage;
	}

	handleUpdateNewsItem(ni) {
		if (ni && (!this.state.newsItem || ni.id !== this.state.newsItem.id)) {
			this.setState({
				newsItem: ni,
				error: null,
			});
		}
	}

	handleFailedNewsItem(err) {
		this.setState({
			error: err,
		});
	}

	getNewsItem() {
		return this.state.newsItem;
	}
}

SiteStore.dispatchToken = null;

export default AppDispatcher.createStore(SiteStore);
