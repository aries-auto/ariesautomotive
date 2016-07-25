import LookupActions from '../actions/LookupActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';
const EventEmitter = events.EventEmitter;
const KEY = apiKey;

class LookupStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			vehicle: {
				year: '',
				make: '',
				model: '',
			},
			years: [],
			makes: [],
			models: [],
			view: false,
			error: {},
		};
		this.bindListeners({
			get: LookupActions.get,
		});
		this.bindAction(LookupActions.set, this.set);
		// this.get();
	}

	async get() {
		let params = '';
		if (this.state.vehicle.year) {
			params += '/' + this.state.vehicle.year;
		}
		if (this.state.vehicle.make) {
			params += '/' + this.state.vehicle.make;
		}
		if (this.state.vehicle.model) {
			params += '/' + this.state.vehicle.model;
		}
		try {
			await fetch(`${apiBase}/vehicle/category${params}?key=${KEY}`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					makes: this.state.makes,
					models: this.state.models,
				});
				if (data.availableYears !== undefined) {
					this.setState({
						vehicle: this.state.vehicle,
						years: data.availableYears,
						makes: [],
						models: [],
					});
				} else if (data.availableMakes !== undefined) {
					this.setState({
						vehicle: this.state.vehicle,
						years: this.state.years,
						makes: data.availableMakes,
						models: [],
					});
				} else if (data.availableModels !== undefined) {
					this.setState({
						vehicle: this.state.vehicle,
						years: this.state.years,
						makes: this.state.makes,
						models: data.availableModels,
					});
				} else {
					this.setState({
						vehicle: this.state.vehicle,
						years: this.state.years,
						makes: this.state.makes,
						models: this.state.models,
						view: true,
					});
				}
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	set(vehicle) {
		this.setState({ vehicle });
		this.get();
	}
}


export default Dispatcher.createStore(LookupStore, 'LookupStore');
