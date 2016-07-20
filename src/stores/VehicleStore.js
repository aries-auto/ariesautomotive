import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import VehicleActions from '../actions/VehicleActions';
import { apiBase, apiKey } from '../config';

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
			partToAdd: null,
			partToRemove: null,
			showIconMediaVehicle: true,
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
		const params = '&year=' + this.state.vehicle.year + '&make=' + this.state.vehicle.make + '&model=' + encodeURIComponent(this.state.vehicle.model) + '&envision=true';
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
			let catStyleParts = [];
			if (Array.isArray(resps[0])) {
				catStyleParts = resps[0];
			}
			if (!Array.isArray(resps[1].parts) && !Array.isArray(resps[0])) {
				this.setState({ error: 'no parts returned.' });
				return;
			}
			if (!Array.isArray(resps[0])) {
				this.setState({ error: resps[0].message });
			}
			try {
				catStyleParts.push({ 'name': 'Seat Defenders', 'styles': [{ 'name': 'all', 'parts': resps[1].parts }] });
				let activeCategory = this.state.activeCategory;
				if (!activeCategory) {
					activeCategory = catStyleParts[0];
				}
				let style = this.state.style;
				if (this.checkStyle(activeCategory)) {
					style = this.checkStyle(activeCategory);
				}

				this.setState({ catStyleParts, activeCategory, showStyle: false, style });
			} catch (e) {
				this.setState({ error: e });
			}
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
	setShowIconMediaVehicleState(showIconMediaVehicle) {
		this.setState({ showIconMediaVehicle });
	}

	setIconMediaVehicle(iconMediaVehicle) {
		this.setState({ iconMediaVehicle, showIconMediaVehicle: false });
	}

	setStyle(style) {
		const vehicle = this.state.vehicle;
		vehicle.style = style.name;
		this.setState({ showStyle: false, style, vehicle });
	}

	// adds part to state.vehicle.parts; removes part of same layer
	addPartToVehicle(part) {
		// must have iconLayer - TODO is this true?
		if (part.iconLayer === '') {
			return;
		}
		const vehicle = this.state.vehicle;
		if (!vehicle.parts) {
			vehicle.parts = [];
		}
		// remove part with same iconLayer
		let partToRemove = null;
		for (const i in vehicle.parts) {
			if (vehicle.parts[i].iconLayer === part.iconLayer && !this.partIsOnVehicle(part)) {
				partToRemove = vehicle.parts[i];
				vehicle.parts.splice(i);
			}
		}
		if (!this.partIsOnVehicle(part)) {
			vehicle.parts.push(part);
		}
		this.setState({ vehicle, partToAdd: part, partToRemove });
	}

	// removes part from state.vehicle.parts
	removePartFromVehicle(part) {
		const vehicle = this.state.vehicle;
		for (const i in vehicle.parts) {
			if (vehicle.parts[i].id === part.id) {
				vehicle.parts.splice(i, 1);
			}
		}
		this.setState({ vehicle, partToRemove: part });
	}

	// returns true if part is already in state.vehicle.parts; otherwise false
	partIsOnVehicle(part) {
		for (const i in this.state.vehicle.parts) {
			if (part.id === this.state.vehicle.parts[i].id) {
				return true;
			}
		}
		return false;
	}
}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
