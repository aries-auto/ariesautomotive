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
			imageLoading: false,
			categories: [],
			envision: {
				vehicleParts: [],
				layers: [],
				vehicle: null,
				vehicleID: null,
				loading: false,
				colorID: null,
				matchedProducts: [],
				image: null,
			},
		};

		this.bindListeners({
			handleUpdateVehicle: VehicleActions.UPDATE_VEHICLE,
			handleFailedVehicle: VehicleActions.FAILED_VEHICLE,

			handleUpdateEnvision: VehicleActions.UPDATE_ENVISION,
			handleLoadingEnvision: VehicleActions.LOADING_ENVISION,
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

		if (v.base.year === '' || v.base.make === '' || v.base.model === '') {
			v.products = this.state.vehicle.products;
			v.lookup_category = this.state.vehicle.lookup_category;
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

	handleUpdateEnvision(data) {
		if (!data.resp) {
			return null;
		}
		this.setState({
			envision: {
				vehicleParts: this.state.envision.matchedProducts.map((p) => p.part_number),
				layers: data.resp.layers,
				vehicle: data.resp.vehicle,
				image: data.resp.image,
				matchedProducts: this.state.envision.matchedProducts,
				loading: false,
				colorID: data.colorID,
			},
			error: null,
		});
	}

	handleLoadingEnvision() {
		this.setState({
			envision: {
				vehicleParts: this.state.envision.vehicleParts,
				layers: this.state.envision.layers,
				vehicle: this.state.envision.vehicle,
				image: this.state.envision.image,
				matchedProducts: this.state.envision.matchedProducts,
				loading: true,
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
		if (id === this.state.envision.vehicleID) {
			return;
		}

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
		if (id === this.state.envision.colorID) {
			return;
		}

		setTimeout(() => {
			this.getInstance().fetchEnvision(
				this.state.envision.vehicle.year,
				this.state.envision.vehicle.make,
				this.state.envision.vehicle.model,
				id,
				this.state.envision.vehicleParts,
			);
		}, 0);
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
	addEnvisionPart(args) {
		const part = args[0];
		const layer = args[1];
		// must have iconLayer - TODO is this true?
		if (!layer || layer.intLayerID === '') {
			return;
		}
		const matched = this.state.envision.matchedProducts || [];
		// remove part with same iconLayer
		matched.map((m, i) => {
			let mLayer = null;
			this.state.envision.layers.map((l) => {
				if (l.strPartNumber.localeCompare(m.part_number) === 0) {
					mLayer = l;
				}
			});

			if (mLayer.intLayerID === layer.intLayerID && !this.partIsOnVehicle(part)) {
				matched.splice(i, 1);
			}
		});

		if (!this.partIsOnVehicle(part)) {
			matched.push(part);
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

		setTimeout(() => {
			this.getInstance().fetchEnvision(
				this.state.envision.vehicle.year,
				this.state.envision.vehicle.make,
				this.state.envision.vehicle.model,
				this.state.envision.colorID,
				matched.map((p) => p.part_number).join(','),
			);
		}, 0);
	}

	// removes part from state.vehicle.parts
	removeEnvisionPart(part) {
		const matched = this.state.envision.matchedProducts;
		for (const i in matched) {
			if (matched[i].id === part.id) {
				matched.splice(i, 1);
			}
		}

		setTimeout(() => {
			this.getInstance().fetchEnvision(
				this.state.envision.vehicle.year,
				this.state.envision.vehicle.make,
				this.state.envision.vehicle.model,
				this.state.envision.colorID,
				matched.map((p) => p.part_number).join(','),
			);
		}, 0);
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
