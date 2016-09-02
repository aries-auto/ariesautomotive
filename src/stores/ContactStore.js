import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import ContactActions from '../actions/ContactActions';
import ContactSource from '../sources/ContactSource';

const EventEmitter = events.EventEmitter;

class ContactStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			types: [],
			inputs: {},
		};

		this.bindListeners({
			handleUpdateTypes: ContactActions.UPDATE_TYPES,
			handleFailedTypes: ContactActions.FAILED_TYPES,
			handleSetInput: ContactActions.SET_INPUT,
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
		return this.state.types;
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

}

ContactStore.dispatchToken = null;

export default AppDispatcher.createStore(ContactStore);
