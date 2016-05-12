import AppGuideActions from '../actions/AppGuideActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

const EventEmitter = events.EventEmitter;

const KEY = apiKey;

class AppGuideStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			guides: [],
			error: {},
			guide: null,
		};
		this.bindListeners({
			all: AppGuideActions.all,
			set: AppGuideActions.set,
			reset: AppGuideActions.reset,
			setPage: AppGuideActions.setPage,
		});
	}

	async all() {
		try {
			await fetch(`${apiBase}/vehicle/mongo/cols?key=${KEY}&brandID=${brand}`)
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

	async set(args) {
		const collection = args[0];
		let page = 0;
		if (args.length > 1 && args[1] !== '') {
			page = args[1];
		}
		const limit = 1000;
		try {
			await fetch(`${apiBase}/vehicle/mongo/apps?key=${KEY}&brandID=3&collection=${collection}&limit=${limit}&page=${page}`, {
				method: 'post',
				headers: {
					'Accept': 'application/json',
				},
			})
			.then((resp) => {
				return resp.json();
			}).then((guide) => {
				if (guide.applications.length === 0) {
					return;
				}
				guide.name = collection;
				this.setState({
					guide,
					page,
				});
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	reset() {
		this.setState({
			guide: null,
		});
	}

	setPage(page) {
		this.setState({
			page,
		});
	}

}


export default Dispatcher.createStore(AppGuideStore, 'AppGuideStore');
