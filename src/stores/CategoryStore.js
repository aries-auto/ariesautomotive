import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import CategoryActions from '../actions/CategoryActions';
import CategorySource from '../sources/CategorySource';

const EventEmitter = events.EventEmitter;

class CategoryStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			categories: [],
		};

		this.bindListeners({
			handleUpdateCategories: CategoryActions.UPDATE_CATEGORIES,
			handleFailedCategories: CategoryActions.FAILED_CATEGORIES,
		});

		this.exportPublicMethods({
			getCategories: this.getCategories,
		});

		this.exportAsync(CategorySource);
	}

	handleUpdateCategories(cats) {
		if (cats && (!this.state.categories || cats.length > this.state.categories.length)) {
			this.setState({
				categories: cats,
				error: null,
			});
		}
	}

	handleFailedCategories(err) {
		this.setState({
			error: err,
		});
	}

	getCategories() {
		return this.state.categories;
	}
}

CategoryStore.dispatchToken = null;

export default AppDispatcher.createStore(CategoryStore);
