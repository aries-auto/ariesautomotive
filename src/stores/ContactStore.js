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
			error: {},
		};
		this.bindListeners({
			getCountries: ContactActions.getCountries,
		});
		if (this.state.countries.length === 0) {
			this.getCountries();
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

}


export default Dispatcher.createStore(ContactStore, 'ContactStore');
