import BuyActions from '../actions/BuyActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { googleApiKey, iapiBase, apiKey } from '../config';
const EventEmitter = events.EventEmitter;

const KEY = apiKey;
const GOOGLE_API_KEY = googleApiKey;

class BuyStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			local: true,
			center: {
				lat: 44.8167,
				lng: -91.5000,
			},
			bounds: {
				ne: '44.853219616918416,-91.4007797241211',
				sw: '44.78015723973733,-91.59647369384766',
			},
			skip: 0,
			sort: 2,
			count: 100,
			brand: 3,
			markers: [],
			showModal: false,
			origin: '',
			destination: '',
			fetchDirections: false,
			directions: null,
			suggestions: [],
			showRegions: false,
			regions: [],
			zoom: 13,
			error: null,
			checked: {
				platinum: true,
				gold: true,
				silver: true,
			},
			scriptLoaded: false,
		};
		this.bindListeners({
			setLocal: BuyActions.setLocal,
			bounds: BuyActions.bounds,
			setMarkers: BuyActions.setMarkers,
			online: BuyActions.online,
			setModal: BuyActions.setModal,
			setOrigin: BuyActions.setOrigin,
			showDirections: BuyActions.showDirections,
			setDirections: BuyActions.setDirections,
			setSuggestions: BuyActions.setSuggestions,
			setCurrentLocation: BuyActions.setCurrentLocation,
			setCenter: BuyActions.setCenter,
			setShowRegions: BuyActions.setShowRegions,
			regions: BuyActions.regions,
			setCenterAndZoom: BuyActions.setCenterAndZoom,
			setError: BuyActions.setError,
			geocode: BuyActions.geocode,
			markerVisibility: BuyActions.markerVisibility,
			getAddressFromLatLng: BuyActions.getAddressFromLatLng,
			updateScriptLoaded: BuyActions.updateScriptLoaded,
		});
	}

	setLocal(local) {
		this.setState({
			local,
		});
		if (local === false) {
			this.online();
		}
	}

	setMarkers(markers) {
		this.setState({ markers });
	}

	setSuggestions(suggestions) {
		this.setState({ suggestions });
	}

	setCurrentLocation(currentLocation) {
		this.setState({ currentLocation });
	}

	setCenter(center) {
		this.setState({ center });
	}

	setError(error) {
		this.setState({ error });
	}
	updateScriptLoaded() {
		this.setState({ scriptLoaded: true, google: window.google });
	}

	setCenterAndZoom(args) {
		let showRegions = false;
		if (args[1] < 7) {
			showRegions = true;
		}
		this.setState({ center: args[0], zoom: args[1], showRegions, markers: [] });
	}

	setModal(args) {
		const showModal = args[0];
		this.setState({ showModal });
		if (args.length > 1) {
			const address = args[1].address + ' ' + args[1].city + ', ' + args[1].state.abbreviation + ' ' + args[1].postalCode;
			this.setState({
				destination: address,
			});
		}
	}

	setOrigin(origin) {
		this.setState({ origin });
	}

	showDirections(fetchDirections) {
		this.setState({ fetchDirections, showModal: null });
	}

	setDirections(directions) {
		this.setState({ directions, showModal: null });
	}

	setShowRegions(showRegions) {
		this.setState({ showRegions });
	}

	markerVisibility(args) {
		const selectedTier = args[0];
		const checked = args[1];

		if (this.state.markers.length < 1) {
			return;
		}
		this.state.markers.map((marker, i) => {
			if (marker.dealerTier && marker.dealerTier.tier && marker.dealerTier.tier.toLowerCase() === selectedTier) {
				if (!this.state.markers[i].hide) {
					this.state.markers[i].hide = true;
					return;
				}
				this.state.markers[i].hide = !this.state.markers[i].hide;
			}
		});
		this.state.checked[selectedTier] = checked;
		this.setState({ markers: this.state.markers, checked: this.state.checked });
	}
	async bounds(args) {
		this.setState({ center: args[0], zoom: args[2] });
		let showRegions = false;
		if (args[2] < 7) {
			showRegions = true;
		}
		const params = `&brand=${this.state.brand}&skip=${this.state.skip}&sort=${this.state.sort}&count=${this.state.count}&center=${args[0].lat},${args[0].lng}&ne=${args[1].ne}&sw=${args[1].sw}`;
		try {
			await fetch(iapiBase + '/dealers/local/bounds?key=' + KEY + params, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				let markers = [];
				if (data && data !== null && showRegions === false) {
					data.map((marker) => {
						this.state.markers.map((currentMarker) => {
							if (currentMarker.id === marker.id) {
								marker.hide = currentMarker.hide;
							}
						});
					});
					markers = data;
				}
				this.setState({ markers, showRegions, error: null });
			});
		} catch (err) {
			this.setState({
				error: err.message,
			});
		}
	}

	async online() {
		const params = `&brand=${this.state.brand}&skip=${this.state.skip}&count=${this.state.count}`;
		try {
			await fetch(iapiBase + '/dealers/online?key=' + KEY + params, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				if (data && data !== null) {
					this.setState({ markers: data, error: null });
				} else {
					this.setState({ error: 'Not enough results.' });
				}
			});
		} catch (err) {
			this.setState({
				error: err.message,
			});
		}
	}

	async regions() {
		try {
			await fetch(iapiBase + '/dealers/local/regions?key=' + KEY, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				if (data && data !== null) {
					this.setState({ regions: data, error: null });
				} else {
					this.setState({ error: 'Not enough results.' });
				}
			});
		} catch (err) {
			this.setState({
				error: err.message,
			});
		}
	}

	async geocode(address) {
		try {
			let center = {};
			let bounds = {};
			const zoom = 12;
			await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + GOOGLE_API_KEY, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				if (data && data !== null && data.status === 'OK' && data.results.length > 0) {
					center = { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng };
					bounds = {
						ne: (data.results[0].geometry.viewport.northeast.lat) + ',' + (data.results[0].geometry.viewport.northeast.lng),
						sw: (data.results[0].geometry.viewport.southwest.lat) + ',' + (data.results[0].geometry.viewport.southwest.lng),
					};
					this.setState({ center, zoom, error: null, bounds, suggestions: null });
				} else {
					this.setState({ error: 'Not enough results.' });
				}
			});
			await this.bounds([center, bounds, zoom]);
		} catch (err) {
			this.setState({
				error: err.message,
			});
		}
	}

	async getAddressFromLatLng(latLng) {
		let address = '';
		try {
			await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + encodeURIComponent(latLng) + '&key=' + GOOGLE_API_KEY, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				if (data && data !== null && data.status === 'OK' && data.results.length > 0) {
					address = data.results[0].formatted_address;
				}
			});
			await this.geocode(address);
		} catch (err) {
			this.setState({
				error: err.message,
			});
		}
	}
}


export default Dispatcher.createStore(BuyStore, 'BuyStore');
