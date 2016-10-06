import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import ga from 'react-ga';
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
			envision: {
				vehicleParts: [],
				partNumbers: [],
				vehicleID: null,
				colorID: null,
				matchedProducts: [],
			},
		};

		this.bindListeners({
			handleUpdateVehicle: VehicleActions.UPDATE_VEHICLE,
			handleFailedVehicle: VehicleActions.FAILED_VEHICLE,

			handleUpdateEnvision: VehicleActions.UPDATE_ENVISION,
			handleFailedEnvision: VehicleActions.FAILED_ENVISION,
			handleSetEnvisionVehicle: VehicleActions.SET_ENVISION_VEHICLE,
			handleSetEnvisionColor: VehicleActions.SET_ENVISION_COLOR,

			handleSetActiveIndex: VehicleActions.SET_ACTIVE_INDEX,

			handleUpdateFitments: VehicleActions.UPDATE_FITMENTS,
			handleFailedFitments: VehicleActions.FAILED_FITMENTS,
		});

		this.bindActions(VehicleActions);

		this.exportPublicMethods({
			getVehicle: this.getVehicle,
			getEnvision: this.getEnvision,
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

	handleUpdateEnvision(e) {
		// find the most vehicle that has the most product
		// fitments.
		e.vehicleParts.sort((a, b) => {
			return Object.keys(b.parts).length - Object.keys(a.parts).length;
		});

		this.setState({
			envision: {
				vehicleParts: e.vehicleParts,
				partNumbers: e.partNumbers,
				vehicleID: e.vehicleParts[0].vehicle.intVehicleID,
				colorID: this.state.envision.colorID,
				matchedProducts: this.state.envision.matchedProducts,
			},
			error: null,
		});
	}

	handleFailedEnvision(err) {
		this.setState({
			error: err,
		});
	}

	getEnvision() {
		return this.state.envision;
	}

	handleSetEnvisionVehicle(id) {
		this.setState({
			envision: {
				vehicleParts: this.state.envision.vehicleParts,
				partNumbers: this.state.envision.partNumbers,
				vehicleID: id,
				colorID: this.state.envision.colorID,
				matchedProducts: this.state.envision.matchedProducts,
			},
		});
	}

	handleSetEnvisionColor(id) {
		this.setState({
			envision: {
				vehicleParts: this.state.envision.vehicleParts,
				partNumbers: this.state.envision.partNumbers,
				vehicleID: this.state.envision.vehicleID,
				colorID: id,
				matchedProducts: this.state.envision.matchedProducts,
			},
		});
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
	addEnvisionPart(part) {
		// must have iconLayer - TODO is this true?
		if (part.iconLayer === '') {
			return;
		}
		const matched = this.state.envision.matchedProducts || [];
		// remove part with same iconLayer
		matched.map((m, i) => {
			if (m.iconLayer === part.iconLayer && !this.partIsOnVehicle(part)) {
				matched.splice(i, 1);
			}
		});
		if (!this.partIsOnVehicle(part)) {
			matched.push(part);
		}

		// we need to make sure that the current vehicle image works for the
		// updated part array.
		let works = false;
		this.state.envision.vehicleParts.map((vp) => {
			if (vp.vehicle.intVehicleID !== this.state.envision.vehicleID) {
				return;
			}

			let count = 0;
			matched.map((p) => {
				if (vp.parts[p.part_number]) {
					count++;
				}
			});

			if (count === matched.length) {
				works = true;
			}
		});

		let newVehicle = this.state.envision.vehicleID;
		if (!works) { // find new vehicle
			for (let i = 0; i < this.state.envision.vehicleParts.length; i++) {
				const vp = this.state.envision.vehicleParts[i];
				let count = 0;
				matched.map((p) => {
					if (vp.parts[p.part_number]) {
						count++;
					}
				});

				if (count === matched.length) {
					newVehicle = vp.vehicle.intVehicleID;
					break;
				}
			}
		}

		let lbl = part.part_number || '';
		if (this.state.vehicle) {
			lbl = `${this.state.vehicle.base.year} ${this.state.vehicle.base.make} ${this.state.vehicle.base.model} ${part.part_number}`;
		}

		ga.event({
			category: 'Envision',
			action: 'Add Part',
			label: lbl,
		});

		this.setState({
			envision: {
				vehicleParts: this.state.envision.vehicleParts,
				partNumbers: this.state.envision.partNumbers,
				vehicleID: newVehicle,
				colorID: this.state.envision.colorID,
				matchedProducts: matched,
			},
		});
	}

	// removes part from state.vehicle.parts
	removeEnvisionPart(part) {
		const matched = this.state.envision.matchedProducts;
		for (const i in matched) {
			if (matched[i].id === part.id) {
				matched.splice(i, 1);
			}
		}

		this.setState({
			envision: {
				vehicleParts: this.state.envision.vehicleParts,
				partNumbers: this.state.envision.partNumbers,
				vehicleID: this.state.envision.vehicleID,
				colorID: this.state.envision.colorID,
				matchedProducts: matched,
			},
		});
	}

	// returns true if part is already in state.vehicle.parts; otherwise false
	partIsOnVehicle(part) {
		for (const i in this.state.envision.matchedProducts) {
			if (part.id === this.state.envision.matchedProducts[i].id) {
				return true;
			}
		}
		return false;
	}
}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
