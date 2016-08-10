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
			catStyleParts: null,
			activeCategory: null,
		};
		this.bindListeners({
			setActiveCategory: VehicleActions.setActiveCategory,
			setStyle: VehicleActions.setStyle,
		});
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
		const apiResp = await fetch(`${apiBase}/vehicle/category/${params}?key=${KEY}&brands=${brand.id}`);
		const resp = await apiResp.json();
		if (!this.state.activeCategory) {
			this.setActiveCategory(resp.lookup_category[0]);
		}
		this.setState({ categories: resp.lookup_category });
		return;
	}

	async getCategoryParts(activeCategory, style) {
		const params = `${this.state.vehicle.year}/${this.state.vehicle.make}/${this.state.vehicle.model}/${activeCategory.category.title}`;
		const catResp = await fetch(`${apiBase}/vehicle/category/${params}?key=${KEY}&withParts=true&brands=${brand.id}`);
		const data = await catResp.json();
		let s = style;
		s = this.linkPartsToStyle(data, s);

		this.setState({ activeCategory, style: s, showStyle: false });
		return;
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
					parts.push(apiResp.products[i]);
				}
			}
		}
		style.parts = parts;
		return style;
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
		this.getCategoryParts(this.state.activeCategory, style);
	}

	setLookupCategories(lookupCategories) {
		this.setState({ lookupCategories });
	}
}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
