import AppDispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import SearchActions from '../actions/SearchActions';
import SearchSource from '../sources/SearchSource';

const EventEmitter = events.EventEmitter;

class SearchStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			searchResults: null,
			searchTerm: '',
		};

		this.bindListeners({
			handleUpdateSearchResults: SearchActions.UPDATE_SEARCH_RESULTS,
			handleFailedSearchResults: SearchActions.FAILED_SEARCH_RESULTS,
			handleLoadingSearchResults: SearchActions.LOADING_SEARCH_RESULTS,
		});

		this.exportPublicMethods({
			getSearchResults: this.getSearchResults,
		});

		this.exportAsync(SearchSource);
	}

	handleUpdateSearchResults(args) {
		this.setState({
			searchResults: args[0] || {},
			searchTerm: args[1] || '',
			error: null,
			loading: false,
		});
	}

	handleFailedSearchResults(err) {
		this.setState({
			error: err,
			loading: false,
		});
	}

	handleLoadingSearchResults() {
		this.setState({
			loading: true,
		});
	}

	getSearchResults() {
		return this.state.searchResults;
	}
}

SearchStore.dispatchToken = null;

export default AppDispatcher.createStore(SearchStore);
