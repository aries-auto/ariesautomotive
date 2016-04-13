import BuyActions from '../actions/BuyActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { iapiBase } from '../config';
const EventEmitter = events.EventEmitter;

const KEY = process.env.API_KEY;

class BuyStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			local: true,
			center: {
				lat: 44.8167,
				lng: -91.5000,
			},
			bounds: {
				ne: '44.853219616918416,-91.4007797241211',
				sw: '44.78015723973733,-91.59647369384766',
			},
			skip: 0,
			sort: 2,
			count: 100,
			brand: 3,
			markers: [],
			showModal: false,
			startingLocation: '',
			location: {},
		};
		this.bindListeners({
			setLocal: BuyActions.setLocal,
			bounds: BuyActions.bounds,
			setMarkers: BuyActions.setMarkers,
			online: BuyActions.online,
			setModal: BuyActions.setModal,
			setStartingLocation: BuyActions.setStartingLocation,
			setLocation: BuyActions.setLocation,
		});
	}

	setLocal(local) {
		this.setState({
			local,
		});
		if (local === false) {
			this.online();
		}
	}

	setMarkers(markers) {
		this.setState({ markers });
	}

	setModal(args) {
		const showModal = args[0];
		this.setState({ showModal });
		if (args.length > 1) {
			this.setState({
				location: args[1],
			});
		}
	}

	setStartingLocation(startingLocation) {
		this.setState({ startingLocation });
	}

	setLocation(location) {
		this.setState({ location });
	}

	async bounds(args) {
		const params = `&brand=${this.state.brand}&skip=${this.state.skip}&sort=${this.state.sort}&count=${this.state.count}&center=${args[0].lat},${args[0].lng}&ne=${args[1].ne}&sw=${args[1].sw}`;
		try {
			await fetch(iapiBase + '/dealers/local/bounds?key=' + KEY + params, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				if (data && data !== null) {
					this.setState({ markers: data });
				}
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	async online() {
		const params = `&brand=${this.state.brand}&skip=${this.state.skip}&count=${this.state.count}`;
		try {
			await fetch(iapiBase + '/dealers/online?key=' + KEY + params, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}).then((resp) => {
				return resp.json();
			}).then((data) => {
				if (data && data !== null) {
					this.setState({ markers: data });
				}
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}
}


export default Dispatcher.createStore(BuyStore, 'BuyStore');
