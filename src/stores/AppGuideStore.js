import AppGuideActions from '../actions/AppGuideActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
const EventEmitter = events.EventEmitter;

const KEY = process.env.API_KEY;

class AppGuideStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			guides: [],
			error: {},
		};
		this.bindListeners({
			all: AppGuideActions.all,
			get: AppGuideActions.get,
		});
	}

	async all() {
		try {
			await fetch(`http://goapi.curtmfg.com/vehicle/mongo/cols?key=${KEY}&brandID=3`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					guides: data,
				});
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	async get(id) {
		try {
			await fetch(`http://goapi.curtmfg.com/news/${id}?key=${KEY}&brandID=3`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					item: data,
				});
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

}


export default Dispatcher.createStore(AppGuideStore, 'AppGuideStore');
