import FormFieldActions from '../actions/FormFieldActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';
const EventEmitter = events.EventEmitter;
const KEY = apiKey;

class FormFieldStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			countries: [],
			contactTypes: [],
			error: {},
			success: {},
			inputs: {},
			enabled: false,
		};
		this.bindListeners({
			setInput: FormFieldActions.setInput,
		});
		if (this.state.countries.length === 0) {
			this.getCountries();
		}
		if (this.state.contactTypes.length === 0) {
			this.getContactTypes();
		}
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
			await fetch(`${apiBase}/contact/types?key=${KEY}&brandID=${brand}`)
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


	setInput(input) {
		this.state.inputs[input.name] = input.value;
		this.setState({ inputs: this.state.inputs });
	}

}


export default Dispatcher.createStore(FormFieldStore, 'FormFieldStore');
