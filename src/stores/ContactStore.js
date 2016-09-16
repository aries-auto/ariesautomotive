import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import ContactActions from '../actions/ContactActions';
import ContactSource from '../sources/ContactSource';
import { apiBase, apiKey } from '../config';

const EventEmitter = events.EventEmitter;

class ContactStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			contactTypes: [],
			inputs: {},
		};

		this.bindListeners({
			handleUpdateTypes: ContactActions.UPDATE_TYPES,
			handleFailedTypes: ContactActions.FAILED_TYPES,
			handleSetInput: ContactActions.SET_INPUT,
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

		this.state.inputs[input.name] = input.name;
		this.setState({
			inputs: this.state.inputs,
		});
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
