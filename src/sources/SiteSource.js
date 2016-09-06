import SiteActions from '../actions/SiteActions';
import fetch from '../core/fetch';

const SiteSource = {
	fetchTestimonials() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`/api/testimonials`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.testimonials || !st.testimonials.length) {
					return null;
				}

				return st.testimonials;
			},

			success: SiteActions.updateTestimonials,
			error: SiteActions.failedTestimonials,
			loading: SiteActions.fetchTestimonials,
		};
	},
};

module.exports = SiteSource;
