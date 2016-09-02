import CategoryActions from '../actions/CategoryActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
const EventEmitter = events.EventEmitter;
import { apiBase, apiKey, brand } from '../config';
import FetchUtils from '../utils/FetchUtils';

class CategoryStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
		};
		this.bindListeners({
		});
		this.catGroups = {};

		this.bindActions(CategoryActions);
	}

	getCats() {
		fetch(`${apiBase}/category?brandID=${brand}&key=${apiKey}`)
		.then(FetchUtils.checkStatus)
		.then(FetchUtils.parseJSON)
		.then((cats) => {
			this.setState({ catGroups: cats });
		}).catch((err) => new Error(err));
	}

}

export default Dispatcher.createStore(CategoryStore, 'CategoryStore');
