import AppGuideActions from '../actions/AppGuideActionsLuverne';
import AppGuideSource from '../sources/AppGuideSourceLuverne';
import Dispatcher from '../dispatchers/AppDispatcher';
import events from 'events';
import fetch from '../core/fetch';
import { apiBase, apiKey } from '../config';

const EventEmitter = events.EventEmitter;

const KEY = apiKey;

class AppGuideStoreLuverne extends EventEmitter {
	constructor() {
		super();
		this.state = {
			guideGroups: [],
			guide: null,
		};
		this.bindListeners({
			set: AppGuideActions.set,
			reset: AppGuideActions.reset,
			setPage: AppGuideActions.setPage,
			handleUpdateAppGuides: AppGuideActions.updateAppGuides,
			handleFailedAppGuides: AppGuideActions.failedAppGuides,
			handleUpdateAppGuide: AppGuideActions.updateAppGuide,
			handleFailedAppGuide: AppGuideActions.failedAppGuide,
		});
		this.exportAsync(AppGuideSource);
	}

	handleUpdateAppGuides(groups) {
		const grps = groups || [];
		if (grps.length === this.state.guideGroups.length) {
			return;
		}
		this.setState({
			guideGroups: grps,
			guide: null,
		});
	}

	handleFailedAppGuides(err) {
		this.setState({
			error: err,
		});
	}

	handleUpdateAppGuide(guide) {
		if (guide) {
			this.setState({
				guide,
			});
		}
	}

	handleFailedAppGuide(err) {
		this.setState({
			error: err,
		});
	}

	async set(args) {
		const catID = args[0];
		let page = 0;
		if (args.length > 1 && args[1] !== '') {
			page = args[1];
		}
		const limit = 100;
		try {
			await fetch(`${apiBase}/vehicle/luverne/mongo/apps?key=${KEY}&brandID=3&catID=${catID}&limit=${limit}&page=${page}`, {
				method: 'post',
				headers: {
					'Accept': 'application/json',
				},
			})
			.then((resp) => {
				return resp.json();
			}).then((guide) => {
				if (guide.applications.length === 0) {
					return;
				}
				guide.name = catID;
				this.setState({
					guide,
					page,
				});
			});
		} catch (err) {
			this.setState({
				error: err,
			});
		}
	}

	reset() {
		this.setState({
			guide: null,
		});
	}

	setPage(page) {
		this.setState({
			page,
		});
	}

}


export default Dispatcher.createStore(AppGuideStoreLuverne, 'AppGuideStoreLuverne');
