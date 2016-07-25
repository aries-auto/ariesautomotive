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
		};
		this.bindListeners({
			setActiveCategory: VehicleActions.setActiveCategory,
			setStyle: VehicleActions.setStyle,
		});
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
			let catStyleParts = resps[0];
			if (!catStyleParts) {
				catStyleParts = [];
			}
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
		this.setState({ showStyle: false, style });
	}
}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
