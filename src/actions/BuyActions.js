import AppDispatcher from '../dispatchers/AppDispatcher';

class BuyActions {
	constructor() {
		this.generateActions('setLocal', 'bounds', 'setMarkers', 'online', 'setModal', 'setOrigin', 'showDirections', 'direction', 'setDirections', 'setSuggestions', 'setCurrentLocation', 'setCenter', 'setShowRegions', 'regions', 'setCenterAndZoom', 'setError', 'geocode', 'markerVisibility', 'getAddressFromLatLng');
	}
}

export default AppDispatcher.createActions(BuyActions);
