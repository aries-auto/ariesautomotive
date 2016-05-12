import TechSupportActions from '../actions/TechSupportActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import FormFieldActions from '../actions/FormFieldActions';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';
const EventEmitter = events.EventEmitter;

const KEY = apiKey;

class TechSupportStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			inputs: {},
			error: null,
			success: null,
		};
		this.bindListeners({
			postContactData: TechSupportActions.postContactData,
			setInput: FormFieldActions.setInput,
		});
	}

	setInput(input) {
		this.state.inputs[input.name] = input.value;
		this.setState({ inputs: this.state.inputs });
	}

	async postContactData() {
		const inputs = JSON.stringify(this.makeData(this.state.inputs));
		try {
			const url = `${apiBase}/techSupport/43/true?key=${KEY}&brandID=3`;
			await fetch(url, {
				method: 'POST',
				body: inputs,
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					success: data,
				});
			});
		} catch (err) {
			this.setState({
				error: err.json(),
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
			purchaseDate: new Date(data.purchaseDate),
			brandId: 3,
			vehicleMake: data.vehicleMake,
			vehicleModel: data.vehicleModel,
			vehicleYear: parseInt(data.vehicleYear, 10),
			dealerName: data.dealerName,
			purchasedFrom: data.purchasedFrom,
			productCode: data.productCode,
			issue: data.issue,
			dateCode: data.dateCode,
		};
		return output;
	}
}


export default Dispatcher.createStore(TechSupportStore, 'TechSupportStore');
