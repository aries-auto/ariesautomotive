import LookupActions from '../actions/LookupActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
const EventEmitter = events.EventEmitter;

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
		}
		this.bindListeners({
			get: LookupActions.get,
		});
		this.bindAction(LookupActions.set, this.set);
		this.get();
	}

	async get(){
		let body = '';
		if (this.state.vehicle.year !== ''){
			body = `year=${this.state.vehicle.year || 0}&make=${this.state.vehicle.make || ''}&model=${this.state.vehicle.model || ''}&style=${this.state.vehicle.style || ''}&collection=${this.state.vehicle.collection || ''}`;
		}
		try {
			const res = await fetch('https://goapi.curtmfg.com/vehicle/mongo/allCollections?key=883d4046-8b96-11e4-9475-42010af00d4e', {
				method: 'post',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				},
				body: body,
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					makes: this.state.makes,
					models: this.state.models,
				})
				if (data.available_years !== undefined) {
					this.setState({
						vehicle: this.state.vehicle,
						years: data.available_years,
						makes: [],
						models: [],
					});
				} else if (data.available_makes !== undefined) {
					this.setState({
						vehicle: this.state.vehicle,
						years: this.state.years,
						makes: data.available_makes,
						models: [],
					});
				} else if (data.available_models !== undefined) {
					this.setState({
						vehicle: this.state.vehicle,
						years: this.state.years,
						makes: this.state.makes,
						models: data.available_models,
					});
				} else {
					this.setState({
						vehicle: this.state.vehicle,
						years: this.state.years,
						makes: this.state.makes,
						models: this.state.models,
						action: 'view',
					});
				}
			})
		}catch(err){
			console.log(err)
		}

	}

	set(vehicle){
		this.setState({vehicle: vehicle});
		this.get();
	}
}


export default Dispatcher.createStore(LookupStore, 'LookupStore');
