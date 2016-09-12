import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import VehicleActions from '../actions/VehicleActions';
import { apiBase, apiKey, brand } from '../config';

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
			activeCategory: null,
			error: null,
			partToAdd: null,
			partToRemove: null,
			showIconMediaVehicle: true,
			categories: [],
		};
		this.bindActions(VehicleActions);
	}

	setActiveCategory(activeCategory) {
		let style = null;
		if (this.checkStyleOptions(activeCategory)) {
			style = this.checkStyleOptions(activeCategory);
		}
		this.getCategoryParts(activeCategory, style);
	}

	checkStyleOptions(category) {
		// cat has one style called 'all'
		if (category.style_options.length === 1 && category.style_options[0].style === 'all') {
			return category.style_options[0];
		}
		// cat has style with same name as current style
		for (const i in category.style_options) {
			if (this.state.style && category.style_options[i].style === this.state.style.style) {
				return category.style_options[i];
			}
		}
		return null;
	}

	async getCategoryStyles() {
		if (this.state.vehicle.year === '' || this.state.vehicle.make === '' || this.state.vehicle.model === '') {
			return;
		}
		const params = `${this.state.vehicle.year}/${this.state.vehicle.make}/${this.state.vehicle.model}`;
		const apiResp = await fetch(`${apiBase}/vehicle/category/${params}?key=${KEY}&brands=${brand}`);
		const resp = await apiResp.json();
		if (!this.state.activeCategory) {
			this.setActiveCategory(resp.lookup_category[0]);
		}
		resp.lookup_category.push(this.makeSeatDefenders());
		this.setState({ categories: resp.lookup_category });
		return;
	}

	async getCategoryParts(activeCategory, style) {
		this.setState({ style }); // why does this work? style does not have parts associated yet...
		const params = `${this.state.vehicle.year}/${this.state.vehicle.make}/${this.state.vehicle.model}/${activeCategory.category.title}`;
		const catResp = await fetch(`${apiBase}/vehicle/category/${params}?key=${KEY}&withParts=true&brands=${brand}`);
		const data = await catResp.json();
		let s = style;
		s = this.linkPartsToStyle(data, s);
		if (activeCategory.category.title === 'Seat Defenders') {
			s.parts = await this.getSeatDefenders();
		}
		this.setState({ activeCategory, showStyle: false });
		return;
	}

	async getSeatDefenders() {
		const apiResp = await fetch(`${apiBase}/category/320/parts?key=${KEY}`);
		const resp = await apiResp.json();
		return resp.parts;
	}

	makeSeatDefenders() {
		const seats = {
			category: {
				title: 'Seat Defenders',
			},
			style_options: [{
				style: 'all',
			}],
		};
		return seats;
	}

	linkPartsToStyle(apiResp, style) {
		if (!style) {
			return null;
		}
		const parts = [];
		for (const i in apiResp.products) {
			if (!apiResp) {
				continue;
			}
			for (const j in style.fitments) {
				if (!style.fitments[j]) {
					continue;
				}
				if (style.fitments[j].product_identifier === apiResp.products[i].part_number) {
					apiResp.products[i].iconLayer = this.state.iconParts ? this.state.iconParts[apiResp.products[i].part_number] : '';
					parts.push(apiResp.products[i]);
				}
			}
		}
		style.parts = parts;
		return style;
	}

	async set(args) {
		const vehicle = args[0];
		let iconParts = null;
		if (args[1]) {
			iconParts = args[1];
		}

		if (
			!vehicle ||
			this.state.vehicle.year === vehicle.year &&
			this.state.vehicle.make === vehicle.make &&
			this.state.vehicle.model === vehicle.model
		) {
			return;
		}

		let showStyle = true;
		if (vehicle.style && vehicle.style !== '') {
			showStyle = false;
		}
		this.setState({ vehicle, showStyle, iconParts });
		await this.getCategoryStyles();
	}

	setShowStyleState(showStyle) {
		this.setState({ showStyle });
	}

	setStyle(style) {
		this.getCategoryParts(this.state.activeCategory, style);
	}

	setLookupCategories(lookupCategories) {
		this.setState({ lookupCategories });
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
				vehicle.parts.splice(i, 1);
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

	setIconParts(iconParts) {
		this.setState({ iconParts });
	}
}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
