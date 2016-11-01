import AppGuideActions from '../actions/AppGuideActions';
import fetch from '../core/fetch';

const AppGuideSource = {
	fetchAppGuides() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`/api/appguides.json`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (st.guideGroups.length === 0) {
					return null;
				}
				return st.guideGroups;
			},

			success: AppGuideActions.updateAppGuides,
			error: AppGuideActions.failedAppGuides,
			loading: AppGuideActions.fetchAppGuides,
		};
	},

	fetchAppGuide() {
		return {
			remote(state, collection, page) {
				return new Promise((res, rej) => {
					fetch(`/api/appguide/${collection}/:${page}.json`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (st.guide) {
					return null;
				}

				return st.guide;
			},

			success: AppGuideActions.updateAppGuide,
			error: AppGuideActions.failedAppGuide,
			loading: AppGuideActions.fetchAppGuide,
		};
	},

};

module.exports = AppGuideSource;
