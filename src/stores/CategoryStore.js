import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import CategoryActions from '../actions/CategoryActions';
import CategorySource from '../sources/CategorySource';
import { brand } from '../config';

const EventEmitter = events.EventEmitter;

class CategoryStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			categories: [],
			categoryMap: [],
			categoryItems: [],
			categoryProducts: {},
		};

		this.bindListeners({
			handleUpdateCategories: CategoryActions.UPDATE_CATEGORIES,
			handleFailedCategories: CategoryActions.FAILED_CATEGORIES,

			handleUpdateCategoryMap: CategoryActions.UPDATE_CATEGORY,
			handleFailedCategoryMap: CategoryActions.FAILED_CATEGORY,

			handleSetProducts: CategoryActions.SET_PRODUCTS,
			handleFailedProducts: CategoryActions.FAILED_PRODUCTS,
		});

		this.exportPublicMethods({
			getCategories: this.getCategories,
			getCategory: this.getCategory,
			getProducts: this.getProducts,
			categoryToItem: this.categoryToItem,
		});

		this.exportAsync(CategorySource);
	}

	handleUpdateCategories(cats) {
		if (cats && (!this.state.categories || cats.length > this.state.categories.length)) {
			cats.sort((a, b) => a.sort > b.sort);
			const items = [];
			for (let i = 0; i < cats.length; i++) {
				const c = cats[i];
				items.push(this.categoryToItem(c));
			}
			if (brand.id !== 4) {
				items.push({
					title: 'Application Guides',
					to: '/appguides',
					text: 'Application Guides',
				});
			}
			this.setState({
				categories: cats,
				categoryItems: items,
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

	categoryToItem(cat) {
		if (cat.children && cat.children.length > 0) {
			cat.children.sort((a, b) => a.sort > b.sort);
		}
		const children = [];
		if (cat.children) {
			for (let i = 0; i < cat.children.length; i++) {
				const ch = cat.children[i];
				children.push(this.categoryToItem(ch));
			}
		}
		const item = {
			title: cat.title,
			to: `/category/${cat.id}/${cat.title}`,
			text: cat.title,
			children,
		};

		return item;
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


	handleSetProducts(prods) {
		this.setState({
			categoryProducts: prods,
		});
	}

	handleFailedProducts(err) {
		this.setState({
			error: err,
		});
	}

	getProducts() {
		return this.state.categoryProducts;
	}
}

CategoryStore.dispatchToken = null;

export default AppDispatcher.createStore(CategoryStore);
