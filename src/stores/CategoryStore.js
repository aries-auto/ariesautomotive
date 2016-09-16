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
			categoryMap: [],
		};

		this.bindListeners({
			handleUpdateCategories: CategoryActions.UPDATE_CATEGORIES,
			handleFailedCategories: CategoryActions.FAILED_CATEGORIES,
			handleUpdateCategoryMap: CategoryActions.UPDATE_CATEGORY,
			handleFailedCategoryMap: CategoryActions.FAILED_CATEGORY,
		});

		this.exportPublicMethods({
			getCategories: this.getCategories,
			getCategory: this.getCategory,
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

	handleUpdateCategoryMap(cat) {
		if (cat && cat.id && !this.state.categoryMap[cat.id]) {
			this.state.categoryMap[cat.id] = cat;
			this.setState({
				categoryMap: this.state.categoryMap,
				error: null,
			});
		}
	}

	handleFailedCategoryMap(err) {
		this.setState({
			error: err,
		});
	}

	getCategory(id) {
		return this.state.categoryMap[id];
	}
}

CategoryStore.dispatchToken = null;

export default AppDispatcher.createStore(CategoryStore);
