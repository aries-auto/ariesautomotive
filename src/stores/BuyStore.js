import BuyActions from '../actions/BuyActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { iapiBase } from '../config';
const EventEmitter = events.EventEmitter;

// const KEY = process.env.API_KEY;

class BuyStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			local: true,
			center: 0,
			ne: 0,
			sw: 0,
			skip: 0,
			sort: 2,
			count: 100,
			brand: 3,
			markers: [],
		};
		this.bindListeners({
			setLocal: BuyActions.setLocal,
			bounds: BuyActions.bounds,
			setMarkers: BuyActions.setMarkers,
		});
	}

	setLocal(local) {
		this.setState({
			local,
		});
	}

	setMarkers(markers) {
		this.setState({ markers });
	}

	async bounds(args) {
		const params = `&brand=${this.state.brand}&skip=${this.state.skip}&sort=${this.state.sort}&count=${this.state.count}&center=${args[0].lat},${args[0].lng}&ne=${args[1].ne}&sw=${args[1].sw}`;
		try {
			await fetch(iapiBase + '/dealers/local/bounds?key=883d4046-8b96-11e4-9475-42010af00d4e' + params, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({ markers: data });
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}
}


export default Dispatcher.createStore(BuyStore, 'BuyStore');
