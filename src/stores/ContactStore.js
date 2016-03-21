import ContactActions from '../actions/ContactActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
const EventEmitter = events.EventEmitter;

const KEY = process.env.API_KEY;

class ContactStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			countries: [],
			contactTypes: [],
			inputs: {},
			error: {},
			success: {},
		};
		this.bindListeners({
			getCountries: ContactActions.getCountries,
			getContactTypes: ContactActions.getContactTypes,
			postContactData: ContactActions.postContactData,
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
			await fetch(`http://goapi.curtmfg.com/geography/countrystates?key=${KEY}`)
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
			await fetch(`http://goapi.curtmfg.com/contact/types?key=${KEY}&brandID=3`)
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
			// TODO
			const url = `http://localhost:8081/contact/${contactType}?key=${KEY}&brandID=3`;
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
				console.log(data);
				this.setState({
					success: data,
				});
			});
		} catch (err) {
			this.setState({
				error: err.json(),
			});
			console.log(this.state.error);
		}
	}

}


export default Dispatcher.createStore(ContactStore, 'ContactStore');
