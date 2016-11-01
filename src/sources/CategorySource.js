import CategoryActions from '../actions/CategoryActions';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

const CategorySource = {
	fetchCategories() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`/api/categories.json`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.categories || !st.categories.length) {
					return null;
				}

				return st.categories;
			},

			success: CategoryActions.updateCategories,
			error: CategoryActions.failedCategories,
			loading: CategoryActions.fetchCategories,
		};
	},

	fetchCategory() {
		return {
			remote(state, id) {
				return new Promise((res, rej) => {
					fetch(`/api/categories/${id}.json`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(state, id) {
				if (!state.categoryMap || !state.categoryMap[id]) {
					return null;
				}

				return state.categoryMap[id];
			},

			success: CategoryActions.updateCategory,
			error: CategoryActions.failedCategory,
			loading: CategoryActions.fetchCategory,
		};
	},

	fetchProducts() {
		return {
			remote(state, id) {
				return new Promise((res, rej) => {
					fetch(`${apiBase}/category/${id}/parts?key=${apiKey}&brandID=${brand.id}`)
					.then((resp) => {
						return resp.json();
					}).then((data) => {
						const temp = data;
						temp.id = id;
						res(temp);
					}).catch(rej);
				});
			},

			local(state, id) {
				if (!state.categoryProducts || !state.categoryProducts.id || id !== state.categoryProducts.id) {
					return null;
				}

				return state.categoryProducts;
			},

			success: CategoryActions.setProducts,
			error: CategoryActions.failedProducts,
			loading: CategoryActions.fetchProducts,
		};
	},
};

module.exports = CategorySource;
