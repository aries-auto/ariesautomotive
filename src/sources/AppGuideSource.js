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
				if (!st.guideGroups || !st.guideGroups.length) {
					return null;
				}

				return st.guideGroups;
			},

			success: AppGuideActions.updateAppGuides,
			error: AppGuideActions.failedAppGuides,
			loading: AppGuideActions.fetchAppGuides,
		};
	},

};

module.exports = AppGuideSource;
