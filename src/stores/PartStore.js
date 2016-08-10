import PartActions from '../actions/PartActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';
const EventEmitter = events.EventEmitter;

const KEY = apiKey;

class PartStore extends EventEmitter {
	constructor() {
		super();
		this.error = {};
		this.bindActions({
			get: PartActions.get,
			getFeatured: PartActions.featured,
			setCarouselIndex: PartActions.setCarouselIndex,
			setVideo: PartActions.setVideo,
			setPart: PartActions.setPart,
		});
	}

	setPart(part) {
		this.setState({ part });
	}

	setCarouselIndex(carouselIndex) {
		this.setState({ carouselIndex });
	}

	setVideo(video) {
		this.setState({ video });
	}

	async get(id) {
		try {
			await fetch(`${apiBase}/part/${id}?key=${KEY}&brandID=${brand.id}`)
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

	async getFeatured() {
		try {
			await fetch(`${apiBase}/part/featured?brandID=${brand.id}&key=${KEY}`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				this.setState({
					featured: data,
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
