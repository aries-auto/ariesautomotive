import WarrantiesActions from '../actions/WarrantiesActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase } from '../config';
const EventEmitter = events.EventEmitter;

const KEY = process.env.API_KEY;

class WarrantiesStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			inputs: [],
			error: {},
			success: {},
			enabled: false,
		};
		this.bindListeners({
			// getCountries: ContactActions.getCountries,
			// getContactTypes: ContactActions.getContactTypes,
			// postContactData: ContactActions.postContactData,
			setFormValidation: WarrantiesActions.setFormValidation,
		});
	}

	async getCountries() {
		try {
			await fetch(`${apiBase}/geography/countrystates?key=${KEY}`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					countries: data,
				});
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	setFormValidation(enabled) {
		this.setState({ enabled });
	}

}


export default Dispatcher.createStore(WarrantiesStore, 'WarrantiesStore');
