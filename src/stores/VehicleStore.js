import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import VehicleActions from '../actions/VehicleActions';
import VehicleSource from '../sources/VehicleSource';

const EventEmitter = events.EventEmitter;

class VehicleStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			vehicle: {
				base: {
					year: '',
					make: '',
					model: '',
				},
				availableYears: [],
				availableMakes: [],
				availableModels: [],
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
			handleUpdateVehicle: VehicleActions.UPDATE_VEHICLE,
			handleFailedVehicle: VehicleActions.FAILED_VEHICLE,
			handleSetActiveIndex: VehicleActions.SET_ACTIVE_INDEX,
			handleUpdateFitments: VehicleActions.UPDATE_FITMENTS,
			handleFailedFitments: VehicleActions.FAILED_FITMENTS,
		});

		this.bindActions(VehicleActions);

		this.exportPublicMethods({
			getVehicle: this.getVehicle,
			getFitments: this.getFitments,
		});

		this.exportAsync(VehicleSource);
	}

	handleUpdateVehicle(v) {
		if (v.base.year !== '' && !v.availableYears) {
			v.availableYears = this.state.vehicle.availableYears;
		}
		if (v.base.make !== '' && !v.availableMakes) {
			v.availableMakes = this.state.vehicle.availableMakes;
		}
		if (v.base.model !== '' && !v.availableModels) {
			v.availableModels = this.state.vehicle.availableModels;
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
		// console.log('fits', fit);
		// console.log('fitments', this.state.fitments);

		// fits.sort((a, b) => a.product_identifier > b.product_identifier);
		//
		// let same = true;
		// this.state.fitments.map((ft, i) => {
		// 	if (!fits[i] || fits[i].product_identifier !== ft.product_identifier) {
		// 		same = false;
		// 	}
		// });
		// // if fit doesnt equal fitments dont set state
		// if (!same) {
		this.setState({
			fitments: fits,
			error: null,
		});
		// }
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

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
