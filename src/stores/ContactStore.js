import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import ContactActions from '../actions/ContactActions';
import ContactSource from '../sources/ContactSource';
import { apiBase, apiKey, brand } from '../config';

const EventEmitter = events.EventEmitter;

class ContactStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			contactTypes: [],
			inputs: {},
			error: null,
			success: null,
		};

		this.bindListeners({
			handleUpdateTypes: ContactActions.UPDATE_TYPES,
			handleFailedTypes: ContactActions.FAILED_TYPES,
			handleSetInput: ContactActions.SET_INPUT,
			postContactData: ContactActions.postContactData,
			all: ContactActions.fetchTypes,
		});

		this.exportPublicMethods({
			getContactTypes: this.getContactTypes,
		});

		this.exportAsync(ContactSource);
	}

	handleUpdateTypes(types) {
		if (types && (!this.state.types || types.length > this.state.types.length)) {
			this.setState({
				types,
				error: null,
			});
		}
	}

	handleFailedTypes(err) {
		this.setState({
			error: err,
		});
	}

	getContactTypes() {
		return this.state.contactTypes;
	}

	handleSetInput(input) {
		if (!input.name) {
			this.setState({
				error: 'can\'t set an input without a name',
			});
			return;
		}

		this.state.inputs[input.name] = input.value;
		this.setState({
			inputs: this.state.inputs,
		});
	}

	postContactData(args) {
		const frm = this.state.inputs;
		frm.reason = frm.reason ? frm.reason : args;

		const inputs = JSON.stringify(frm);
		try {
			fetch(`${apiBase}/${frm.reason}?key=${apiKey}&brand=${brand.id}`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: inputs,
			}).then((resp) => {
				if (resp.status === 200) {
					this.setState({
						success: 'true',
					});
				}
				return resp.json();
			});
		} catch (err) {
			this.setState({
				error: err.message,
			});
		}
	}

	async all() {
		try {
			await fetch(`${apiBase}/contact/types?key=${apiKey}`)
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

}

ContactStore.dispatchToken = null;

export default AppDispatcher.createStore(ContactStore);
