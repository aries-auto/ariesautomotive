import CategoryActions from '../actions/CategoryActions';
import fetch from '../core/fetch';

const CategorySource = {
	fetchCategories() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`/api/categories`)
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
};

module.exports = CategorySource;
