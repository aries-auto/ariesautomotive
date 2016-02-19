import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import VehicleActions from '../actions/VehicleActions';

const EventEmitter = events.EventEmitter;

const CHANGE_EVENT = 'change';

class VehicleStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			vehicle: {
				year: '',
				make: '',
				model: '',
				style: '',
			},
			categoryparts: {},
			totalNumberOfParts: '',
		};
		this.bindListeners({
			getCategoryStyles: VehicleActions.getCategoryStyles,
		});
		this.bindActions({
			set: VehicleActions.set,
		});
		this.getCategoryStyles();
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	async getCategoryStyles() {
		if (this.state.vehicle.year === '' || this.state.vehicle.make === '' || this.state.vehicle.model === '') {
			return;
		}
		const params = '&year=' + this.state.vehicle.year + '&make=' + this.state.vehicle.make + '&model=' + this.state.vehicle.model;
		await fetch('https://goapi.curtmfg.com/vehicle/mongo/allCollections/category?key=883d4046-8b96-11e4-9475-42010af00d4e' + params, {
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
			},
		}).then((resp) => {
			return resp.json();
		}).then((resp) => {
			this.setUpCategoryParts(resp);
			this.emitChange();
		}).catch((err) => {
			this.setState({
				error: err,
			});
		});
	}

	async set(vehicle) {
		this.setState({ vehicle });
		await this.getCategoryStyles();
	}

	setUpCategoryParts(categories) {
		const categoryparts = {};
		let totalNumberOfParts = 0;
		for (const title in categories) {
			if (title) {
				categoryparts[title] = categories[title];
				categoryparts[title].name = title;
				if (this.state.vehicle.style && this.state.vehicle.style !== '') {
					categoryparts[title].style = this.state.vehicle.style;
				}
				totalNumberOfParts += categoryparts[title].length;
				// categoryparts[title].style_required = //TODO?
			}
		}
		this.setState(() => {
			return { categoryparts, totalNumberOfParts };
		});
	}
}

VehicleStore.dispatchToken = null;

export default AppDispatcher.createStore(VehicleStore);
