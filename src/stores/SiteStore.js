import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import ProductActions from '../actions/ProductActions';
import SiteSource from '../sources/SiteSource';

const EventEmitter = events.EventEmitter;

class SiteStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			featuredProducts: [],
		};

		this.bindListeners({
			handleUpdateTestimonials: ProductActions.UPDATE_FEATURED,
			handleFailedTestimonials: ProductActions.FAILED_FEATURED,
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
