import AppDispatcher from '../dispatchers/AppDispatcher';

class GeographyActions {
	constructor() {
		this.generateActions(
			'fetchCountries',
			'updateCountries',
			'failedCountries',
		);
	}
}

export default AppDispatcher.createActions(GeographyActions);
