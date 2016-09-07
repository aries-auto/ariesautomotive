import PartActions from '../actions/PartActions';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
const EventEmitter = events.EventEmitter;


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
}

export default Dispatcher.createStore(PartStore, 'PartStore');
