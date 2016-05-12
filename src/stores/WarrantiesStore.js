import WarrantiesActions from '../actions/WarrantiesActions';
import FormFieldActions from '../actions/FormFieldActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';
const EventEmitter = events.EventEmitter;
const KEY = apiKey;

class WarrantiesStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			inputs: {},
			enabled: false,
			success: false,
			error: null,
		};
		this.bindListeners({
			setInput: FormFieldActions.setInput,
			postData: WarrantiesActions.postData,
		});
	}

	setInput(input) {
		this.state.inputs[input.name] = input.value;
		this.setState({ inputs: this.state.inputs });
	}

	async postData() {
		const inputs = JSON.stringify(this.makeData(this.state.inputs));
		try {
			await fetch(`${apiBase}/warranty/41/false?key=${KEY}`, {
				method: 'post',
				body: inputs,
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				if (data.message) {
					this.setState({
						error: data.message,
						success: false,
					});
				} else {
					this.setState({
						success: true,
						error: null,
					});
				}
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	makeData(data) {
		let output = {};
		output = {
			contact: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				city: data.city,
				address1: data.address1,
				state: data.state,
				country: data.country,
				postalCode: data.postalCode,
				brand: {
					id: 3,
				},
			},
			oldPartNumber: data.partNumber,
			serialNumber: data.serialNumber,
			date: new Date(data.date),
		};
		return output;
	}

}


export default Dispatcher.createStore(WarrantiesStore, 'WarrantiesStore');
