import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import LuverneActions from '../actions/LuverneActions';
import LuverneSource from '../sources/LuverneSource';

const EventEmitter = events.EventEmitter;

class LuverneStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			vehicle: {
				base_vehicle: {
					year: '',
					make: '',
					model: '',
				},
				available_years: [],
				available_makes: [],
				available_models: [],
				lookup_category: [],
				products: [],
			},
			activeIndex: 0,
			fitments: [],
			showStyle: false,
			activeCategory: null,
			error: null,
			partToAdd: null,
			partToRemove: null,
			showIconMediaVehicle: true,
			categories: [],
		};

		this.bindListeners({
			handleUpdateVehicle: LuverneActions.UPDATE_VEHICLE,
			handleFailedVehicle: LuverneActions.FAILED_VEHICLE,
			handleSetActiveIndex: LuverneActions.SET_ACTIVE_INDEX,
			handleUpdateFitments: LuverneActions.UPDATE_FITMENTS,
			handleFailedFitments: LuverneActions.FAILED_FITMENTS,
		});

		this.bindActions(LuverneActions);

		this.exportPublicMethods({
			getVehicle: this.getVehicle,
			getFitments: this.getFitments,
		});

		this.exportAsync(LuverneSource);
	}

	handleUpdateVehicle(v) {
		if (v.base_vehicle.year !== '' && !v.available_years) {
			v.available_years = this.state.vehicle.available_years;
		}
		if (v.base_vehicle.make !== '' && !v.available_makes) {
			v.available_makes = this.state.vehicle.available_makes;
		}
		if (v.base_vehicle.model !== '' && !v.available_models) {
			v.available_models = this.state.vehicle.available_models;
		}

		this.setState({
			vehicle: v,
			error: null,
		});
	}

	handleFailedVehicle(err) {
		this.setState({
			error: err,
		});
	}

	getVehicle() {
		return this.state.vehicle;
	}

	handleUpdateFitments(fits) {
		this.setState({
			fitments: fits,
			error: null,
		});
	}

	handleFailedFitments(err) {
		this.setState({
			error: err,
		});
	}

	getFitments() {
		return this.state.vehicle;
	}

	handleSetActiveIndex(id) {
		const t = (id === this.state.activeIndex) ? t : id;
		this.setState({
			activeIndex: t,
			fitments: [],
		});
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

LuverneStore.dispatchToken = null;

export default AppDispatcher.createStore(LuverneStore);
