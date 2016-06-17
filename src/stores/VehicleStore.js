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
			if (vehicle.parts[i].iconLayer === part.iconLayer) {
				vehicle.parts.splice(i);
				partToRemove = vehicle.parts[i];
			}
		}
		vehicle.parts.push(part);
		this.setState({ vehicle, partToAdd: part, partToRemove });
	}

	removePartFromVehicle(part) {
		const vehicle = this.state.vehicle;
		for (const i in vehicle.parts) {
			if (vehicle.parts[i].id === part.id) {
				vehicle.parts.splice(i, 1);
			}
		}
		this.setState({ vehicle, partToRemove: part });
	}
}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
