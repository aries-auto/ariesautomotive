import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import ProductActions from '../actions/ProductActions';
import ProductSource from '../sources/ProductSource';

const EventEmitter = events.EventEmitter;

class ProductStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			featuredProducts: [],
			product: {},
			activeImageIndex: null,
			activeVideo: null,
		};

		this.bindListeners({
			handleUpdateFeatured: ProductActions.UPDATE_FEATURED,
			handleFailedFeatured: ProductActions.FAILED_FEATURED,
			handleUpdateProduct: ProductActions.UPDATE_PRODUCT,
			handleFailedProduct: ProductActions.FAILED_PRODUCT,
			handleSetActiveImageIndex: ProductActions.SET_ACTIVE_IMAGE,
			handleSetActiveVideo: ProductActions.SET_ACTIVE_VIDEO,
		});

		this.exportPublicMethods({
			getFeaturedProducts: this.getFeaturedProducts,
			getProduct: this.getProduct,
		});

		this.exportAsync(ProductSource);
	}

	handleUpdateFeatured(featured) {
		if (featured && (!this.state.featuredProducts || featured.length > this.state.featuredProducts.length)) {
			this.setState({
				featuredProducts: featured,
				error: null,
			});
		}
	}

	handleFailedFeatured(err) {
		this.setState({
			error: err,
		});
	}

	getFeaturedProducts() {
		return this.state.featuredProducts;
	}

	handleUpdateProduct(product) {
		if (product && product.id && (!this.state.product || product.id !== this.state.product.id)) {
			this.setState({
				product,
				error: null,
			});
		}
	}

	handleFailedProduct(err) {
		this.setState({
			error: err,
		});
	}

	handleSetActiveImageIndex(idx) {
		this.setState({
			activeImageIndex: idx,
		});
	}

	handleSetActiveVideo(vid) {
		this.setState({
			activeVideo: vid || null,
		});
	}

	getProduct() {
		return this.state.product;
	}

}

ProductStore.dispatchToken = null;

export default AppDispatcher.createStore(ProductStore);
