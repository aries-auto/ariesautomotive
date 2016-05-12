import PartActions from '../actions/PartActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';
const EventEmitter = events.EventEmitter;

const KEY = apiKey;

class PartStore extends EventEmitter {
	constructor() {
		super();
		this.part = {};
		this.featured = [];
		this.error = {};
		// this.state = {
		// 	part: {},
		// 	featured: [],
		// 	error: {},
		// };
		this.bindActions({
			get: PartActions.get,
			getFeatured: PartActions.featured,
			setCarouselIndex: PartActions.setCarouselIndex,
			setVideo: PartActions.setVideo,
		});
	}

	setCarouselIndex(carouselIndex) {
		this.setState({ carouselIndex });
	}

	setVideo(video) {
		this.setState({ video });
	}

	async get(id) {
		try {
			await fetch(`${apiBase}/part/${id}?key=${KEY}&brandID=3`)
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
			await fetch(`${apiBase}/part/featured?brandID=3&key=${KEY}`)
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
