import CategoryActions from '../actions/CategoryActions';
import fetch from '../core/fetch';

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

};

module.exports = CategorySource;
