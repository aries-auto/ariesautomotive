import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import GeographyActions from '../actions/GeographyActions';
import GeographySource from '../sources/GeographySource';

const EventEmitter = events.EventEmitter;

class GeographyStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			countries: [],
		};

		this.bindListeners({
			handleUpdateCountries: GeographyActions.UPDATE_COUNTRIES,
			handleFailedCountries: GeographyActions.FAILED_COUNTRIES,
		});

		this.exportPublicMethods({
			getCountries: this.getCountries,
		});

		this.exportAsync(GeographySource);
	}

	handleUpdateCountries(countries) {
		if (countries && (!this.state.countries || countries.length !== this.state.countries.length)) {
			this.setState({
				countries,
				error: null,
			});
		}
	}

	handleFailedCountries(err) {
		this.setState({
			error: err,
		});
	}

	getCountries() {
		return this.state.countries;
	}

}

GeographyStore.dispatchToken = null;

export default AppDispatcher.createStore(GeographyStore);
