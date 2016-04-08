import BuyActions from '../actions/BuyActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
// import fetch from '../core/fetch';
// import { apiBase } from '../config';
const EventEmitter = events.EventEmitter;

// const KEY = process.env.API_KEY;

class BuyStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			local: true,
		};
		this.bindListeners({
			setLocal: BuyActions.setLocal,
		});
	}

	setLocal(local) {
		this.setState({
			local,
		});
	}
}


export default Dispatcher.createStore(BuyStore, 'BuyStore');
