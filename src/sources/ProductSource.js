import ProductActions from '../actions/ProductActions';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

const KEY = apiKey;

const ProductSource = {
	fetchFeatured() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`/api/products/featured.json`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.featuredProducts || !st.featuredProducts.length) {
					return null;
				}

				return st.featuredProducts;
			},

			success: ProductActions.updateFeatured,
			error: ProductActions.failedFeatured,
			loading: ProductActions.fetchFeatured,
		};
	},

	fetchProduct() {
		return {
			remote(state, id) {
				return new Promise((res, rej) => {
					fetch(`${apiBase}/part/${id}?key=${KEY}&brandID=${brand.id}`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.product || !st.product.id) {
					return null;
				}

				return st.product;
			},

			success: ProductActions.updateProduct,
			error: ProductActions.failedProduct,
			loading: ProductActions.fetchProduct,
		};
	},
};

module.exports = ProductSource;
