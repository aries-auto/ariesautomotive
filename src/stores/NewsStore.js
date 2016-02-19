import NewsActions from '../actions/NewsActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
const EventEmitter = events.EventEmitter;

class NewsStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			news: [],
			error: {},
		};
		this.bindListeners({
			get: NewsActions.get,
		});
		this.get();
	}

	async get() {
		try {
			await fetch('http://goapi.curtmfg.com/news?key=883d4046-8b96-11e4-9475-42010af00d4e&brandID=3')
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

}


export default Dispatcher.createStore(NewsStore, 'NewsStore');
