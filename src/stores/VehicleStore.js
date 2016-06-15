import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import VehicleActions from '../actions/VehicleActions';
import { apiBase, apiKey, iapiBase } from '../config';

const EventEmitter = events.EventEmitter;
const KEY = apiKey;

class VehicleStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			vehicle: {
				year: '',
				make: '',
				model: '',
			},
			showStyle: false,
			catStyleParts: null,
			activeCategory: null,
			error: null,
		};
		this.bindActions(VehicleActions);
	}

	setActiveCategory(category) {
		let style = null;
		if (this.checkStyle(category)) {
			style = this.checkStyle(category);
		}
		this.setState({ activeCategory: category, style });
	}

	async getCategoryStyles() {
		if (this.state.vehicle.year === '' || this.state.vehicle.make === '' || this.state.vehicle.model === '') {
			return;
		}
		const params = '&year=' + this.state.vehicle.year + '&make=' + this.state.vehicle.make + '&model=' + encodeURIComponent(this.state.vehicle.model);
		Promise.all([
			await fetch(`${apiBase}/vehicle/mongo/categoryStyleParts?key=${KEY}` + params, {
				method: 'post',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				},
			}),
			await fetch(`${apiBase}/category/320/parts?key=${KEY}`),
		]).then((resps) => {
			return Promise.all([resps[0].json(), resps[1].json()]);
		}).then((resps) => {
			resps[0].push({ 'name': 'Seat Defenders', 'styles': [{ 'name': 'all', 'parts': resps[1].parts }] });
			let activeCategory = this.state.activeCategory;
			if (!activeCategory) {
				activeCategory = resps[0][0];
			}
			let style = this.state.style;
			if (this.checkStyle(activeCategory)) {
				style = this.checkStyle(activeCategory);
			}

			this.setState({ catStyleParts: resps[0], activeCategory, showStyle: false, style });
		});
	}

	checkStyle(activeCategory) {
		// cat has one style called 'all'
		if (activeCategory.styles.length === 1 && activeCategory.styles[0].name === 'all') {
			return activeCategory.styles[0];
		}
		// cat has style with same name as current style
		for (const i in activeCategory.styles) {
			if (this.state.style && activeCategory.styles[i].name === this.state.style.name) {
				return activeCategory.styles[i];
			}
		}
		return null;
	}

	async set(vehicle) {
		let showStyle = true;
		if (vehicle.style && vehicle.style !== '') {
			showStyle = false;
		}
		this.setState({ vehicle, showStyle });
		await this.getCategoryStyles();
	}

	setShowStyleState(showStyle) {
		this.setState({ showStyle });
	}

	setStyle(style) {
		const vehicle = this.state.vehicle;
		vehicle.style = style.name;
		this.setState({ showStyle: false, style, vehicle });
	}

	addPartToVehicle(part) {
		const vehicle = this.state.vehicle;
		if (!vehicle.parts) {
			vehicle.parts = [];
		}
		vehicle.parts.push(part);
		this.setState({ vehicle });
	}

	// envision
	async getVehicleImage() {
		await fetch(`${iapiBase}/envision/vehicles/ymm?key=${KEY}&year=${this.state.vehicle.year}&make=${this.state.vehicle.make}&model=${this.state.vehicle.model}`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
			},
		}).then((resp) => {
			return resp.json();
		}).then((resp) => {
			if (resp.Message !== 'OK') {
				this.setState({ error: resp.Message });
				return;
			}
			if (resp.Result < 1) {
				this.setState({ error: 'No Vehicle Images' });
				return;
			}
			const image = this.findImageFromIConnMediaResponse(resp.Vehicles);
			if (image) {
				const vehicle = this.state.vehicle;
				vehicle.image = image;
				this.setState({ vehicle });
				return;
			}
			this.setState({ error: 'No Matching Vehicle Images' });
			return;
		});
	}

	// TODO - how do ARIES styles map to iConn BodyStyles? Then, fix this.
	findImageFromIConnMediaResponse(vehicles) {
		// match
		for (const i in vehicles) {
			if (vehicles[i].strBodyType === this.state.vehicle.style) {
				return vehicles[i].strImageURL;
			}
		}
		// base ok
		for (const i in vehicles) {
			if (vehicles[i].strBodyType === 'Base') {
				return vehicles[i].strImageURL;
			}
		}
		return null;
	}
}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
