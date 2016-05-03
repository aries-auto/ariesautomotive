import WarrantiesActions from '../actions/WarrantiesActions';
import FormFieldActions from '../actions/FormFieldActions';
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
			enabled: false,
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
		try {
			await fetch(`${apiBase}/warranty/24/false?key=${KEY}`, {
				method: 'post',
				data: this.state.inputs,
			})
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				// console.log(data);
				if (data.message) {
					this.setState({
						error: data.message,
					});
				}
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

}


export default Dispatcher.createStore(WarrantiesStore, 'WarrantiesStore');
