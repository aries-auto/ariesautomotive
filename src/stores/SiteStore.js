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
		};

		this.bindListeners({
			handleUpdateTestimonials: SiteActions.UPDATE_TESTIMONIALS,
			handleFailedTestimonials: SiteActions.FAILED_TESTIMONIALS,
		});

		this.exportPublicMethods({
			getTestimonials: this.getTestimonials,
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
}

SiteStore.dispatchToken = null;

export default AppDispatcher.createStore(SiteStore);
