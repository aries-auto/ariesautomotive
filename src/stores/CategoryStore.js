// import CategoryActions from '../actions/CategoryActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
// import fetch from '../core/fetch';
const EventEmitter = events.EventEmitter;

class CategoryStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
		};
		this.bindListeners({
		});
	}

}


export default Dispatcher.createStore(CategoryStore, 'CategoryStore');
