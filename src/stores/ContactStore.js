import ContactActions from '../actions/ContactActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import FormFieldActions from '../actions/FormFieldActions';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';
const EventEmitter = events.EventEmitter;

const KEY = apiKey;

class ContactStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			countries: [],
			contactTypes: [],
			inputs: {},
			error: null,
			success: null,
		};
		this.bindListeners({
			getCountries: ContactActions.getCountries,
			getContactTypes: ContactActions.getContactTypes,
			postContactData: ContactActions.postContactData,
			setInput: FormFieldActions.setInput,
		});
		if (this.state.countries.length === 0) {
			this.getCountries();
		}
		if (this.state.contactTypes.length === 0) {
			this.getContactTypes();
		}
	}

	setInput(input) {
		this.state.inputs[input.name] = input.value;
		this.setState({ inputs: this.state.inputs });
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

	async getContactTypes() {
		try {
			await fetch(`${apiBase}/contact/types?key=${KEY}&brandID=3`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					contactTypes: data,
				});
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	async postContactData(contactType) {
		const inputs = JSON.stringify(this.state.inputs);
		try {
			const url = `${apiBase}/contact/${contactType}?key=${KEY}&brandID=3`;
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
}


export default Dispatcher.createStore(ContactStore, 'ContactStore');
