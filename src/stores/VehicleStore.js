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
		};

		this.bindListeners({
			handleUpdateVehicle: VehicleActions.UPDATE_VEHICLE,
			handleFailedVehicle: VehicleActions.FAILED_VEHICLE,
			handleSetActiveIndex: VehicleActions.SET_ACTIVE_INDEX,
			handleUpdateFitments: VehicleActions.UPDATE_FITMENTS,
			handleFailedFitments: VehicleActions.FAILED_FITMENTS,
		});

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

	handleUpdateFitments(fit) {
		this.setState({
			fitments: fit,
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
		});
	}

}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
