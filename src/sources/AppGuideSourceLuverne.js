import AppGuideActions from '../actions/AppGuideActionsLuverne';
import fetch from '../core/fetch';

const AppGuideSourceLuverne = {
	fetchAppGuides() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`/api/luverne/appguides.json`)
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
			remote(state, catID, page) {
				return new Promise((res, rej) => {
					fetch(`/api/luverne/appguide/${catID}/:${page}.json`)
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

module.exports = AppGuideSourceLuverne;
