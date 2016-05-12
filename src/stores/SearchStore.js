import SearchActions from '../actions/SearchActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';
const EventEmitter = events.EventEmitter;

const KEY = apiKey;

class SearchStore extends EventEmitter {
	constructor() {
		super();
		this.error = {};
		this.bindActions({
			search: SearchActions.search,
			setResult: SearchActions.setResult,
		});
	}

	async search(args) {
		if (args.length === 0) {
			return;
		}
		const term = args[0];
		let page = 0;
		let searchResult = {
			hits: {
				hits: [],
			},
		};
		if (args.length > 1) {
			page = args[1];
		}
		if (args.length > 2) {
			searchResult = args[2];
		}
		const params = `?key=${KEY}&brand=3&page=${page}`;
		try {
			await fetch(`${apiBase}/search/${term}${params}`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				searchResult.hits.hits.push(...data.hits.hits);
				this.setState({
					searchResult,
				});
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	setResult(searchResult) {
		this.setState({ searchResult });
	}

}

export default Dispatcher.createStore(SearchStore, 'SearchStore');
