import SiteActions from '../actions/SiteActions';
import fetch from '../core/fetch';
import { apiBase, apiKey, brand } from '../config';

const SiteSource = {
	fetchTestimonials() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`/api/testimonials.json`)
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

	fetchLandingPage() {
		return {
			remote(state, id) {
				return new Promise((res, rej) => {
					fetch(`${apiBase}/lp/${id}?brand=${brand.id}&key=${apiKey}`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.landingPage || !st.landingPage.Id) {
					return null;
				}

				return st.landingPage;
			},

			success: SiteActions.updateLandingPage,
			error: SiteActions.failedLandingPage,
			loading: SiteActions.fetchLandingPage,
		};
	},

	fetchNewsItem() {
		return {
			remote(state, id) {
				return new Promise((res, rej) => {
					fetch(`${apiBase}/news/${id}?brand=${brand.id}&key=${apiKey}`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.newsItem || !st.newsItem.id) {
					return null;
				}

				return st.landingPage;
			},

			success: SiteActions.updateNewsItem,
			error: SiteActions.failedNewsItem,
			loading: SiteActions.fetchNewsItem,
		};
	},

	fetchContentMenus() {
		return {
			remote() {
				return new Promise((res, rej) => {
					fetch(`/api/content/all.json`)
					.then((resp) => {
						return resp.json();
					}).then(res).catch(rej);
				});
			},

			local(st) {
				if (!st.contentMenus || !st.contentMenus.length) {
					return null;
				}

				return st.contentMenus;
			},

			success: SiteActions.updateContentMenus,
			error: SiteActions.failedContentMenus,
			loading: SiteActions.fetchContentMenus,
		};
	},

	fetchPageData() {
		return {
			remote(st, slug) {
				return new Promise((res, rej) => {
					fetch(`/api/content/${slug}.json`)
					.then((resp) => {
						return resp.json();
					}).then((data) => res(data, slug)).catch(rej);
				});
			},

			local(st) {
				if (!st.pageData.id) {
					return null;
				}

				return st.pageData;
			},

			success: SiteActions.updatePageData,
			error: SiteActions.failedPageData,
			loading: SiteActions.fetchPageData,
		};
	},
};

module.exports = SiteSource;
