import PartActions from '../actions/PartActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
const EventEmitter = events.EventEmitter;

class PartStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			part: {},
			error: {},
		};
		this.bindListeners({
			get: PartActions.get,
		});
	}

	async get(id) {
		try {
			await fetch(`http://goapi.curtmfg.com/part/${id}?key=883d4046-8b96-11e4-9475-42010af00d4e&brandID=3`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					part: data,
				});
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

}

export default Dispatcher.createStore(PartStore, 'PartStore');
