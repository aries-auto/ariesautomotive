import NewsActions from '../actions/NewsActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';
const KEY = apiKey;
const EventEmitter = events.EventEmitter;

class NewsStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			news: [],
			error: {},
		};
		this.bindListeners({
			all: NewsActions.all,
			get: NewsActions.get,
		});
	}

	async all() {
		try {
			await fetch(`${apiBase}/news?key=${KEY}&brandID=3`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					news: data,
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
			await fetch(`${apiBase}/news/${id}?key=${KEY}&brandID=3`)
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


export default Dispatcher.createStore(NewsStore, 'NewsStore');
