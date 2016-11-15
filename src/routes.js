import React from 'react';
import ga from 'react-ga';
import Router from 'react-routing/src/Router';
import App from './components/App';
import BecomeDealer from './components/BecomeDealer';
import Product from './components/Product';
import Category from './components/Category';
import CategoryTree from './components/CategoryTree';
import Contact from './components/Contact';
import CustomContent from './components/CustomContent';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import VehicleResults from './components/VehicleResults';
import LuverneResults from './components/LuverneResults';
import WhereToBuy from './components/WhereToBuy';
import About from './components/About';
import AppGuides from './components/AppGuides';
import AppGuide from './components/AppGuides/AppGuide';
import Terms from './components/Terms';
import Warranties from './components/Warranties';
import LatestNews from './components/LatestNews';
import LatestNewsItem from './components/LatestNewsItem';
import LandingPage from './components/LandingPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import { siteMenu, googleAnalyticsId, brand } from './config';
import VehicleStore from './stores/VehicleStore';
import LuverneStore from './stores/LuverneStore';
import ContactStore from './stores/ContactStore';
import ProductStore from './stores/ProductStore';
import AppGuideStore from './stores/AppGuideStore';
import GeographyStore from './stores/GeographyStore';
import CategoryStore from './stores/CategoryStore';
import SiteStore from './stores/SiteStore';
import SearchStore from './stores/SearchStore';

import cookie from 'react-cookie';

const isBrowser = typeof window !== 'undefined';
const gaOptions = { debug: true };
const MyWindowDependentLibrary = isBrowser ? ga.initialize(googleAnalyticsId, gaOptions) : undefined;

const router = new Router(on => {
	on('*', async (state, next) => {
		if (!state.context) {
			state.context = {};
		}
		state.context.params = state.params;
		state.context.siteMenu = siteMenu;
		const slug = state.params[0].replace(/\//g, '');

		const cookieVehicle = cookie.load('vehicle');
		const cookieVehicleLuverne = cookie.load('vehicleluverne');

		if (slug === '_ahhealth' || slug.indexOf('health') >= 0) {
			return null;
		}

		if (state.path.indexOf('/vehicle') === -1) { // don't want to request this here, since we'll be doing it in the route
			if (brand.id === 4) {
				await Promise.all([
					cookieVehicleLuverne ? LuverneStore.fetchVehicle(cookieVehicleLuverne.base_vehicle.year, cookieVehicleLuverne.base_vehicle.make, cookieVehicleLuverne.base_vehicle.model) : LuverneStore.fetchVehicle(),
				]);
			} else {
				await Promise.all([
					cookieVehicle ? VehicleStore.fetchVehicle(cookieVehicle.base.year, cookieVehicle.base.make, cookieVehicle.base.model) : VehicleStore.fetchVehicle(),
				]);
			}
		}

		await Promise.all([
			SiteStore.fetchPageData(slug),
			CategoryStore.fetchCategories(),
			SiteStore.fetchContentMenus(),
		]);

		if (MyWindowDependentLibrary !== undefined) {
			ga.initialize(googleAnalyticsId, gaOptions);
		}

		ga.pageview('aries:' + state.path);

		const component = await next();
		return component && <App context={state.context}>{component}</App>;
	});

	on('/part/:id', async (state) => {
		await Promise.all([
			ProductStore.fetchFeatured(),
			ProductStore.fetchProduct(state.params.id),
		]);

		return <Product {...state} />;
	});

	on('/category', async (state) => {
		return <CategoryTree context={state.context} />;
	});

	on('/category/:id', async (state) => {
		await CategoryStore.fetchCategory(state.params.id);
		const cat = CategoryStore.getCategory(state.params.id);
		let prods = [];

		if (!cat.vehicle_specific) {
			await	CategoryStore.fetchProducts(state.params.id);
			prods = CategoryStore.getProducts();
		}

		return <Category context={state.context} category={cat} categoryProducts={prods} />;
	});

	on('/category/:id/:title', async (state) => {
		await CategoryStore.fetchCategory(state.params.id);
		const cat = CategoryStore.getCategory(state.params.id);
		let prods = {};

		if (!cat.vehicle_specific) {
			await	CategoryStore.fetchProducts(state.params.id);
			prods = CategoryStore.getProducts();
		}

		return <Category context={state.context} category={cat} categoryProducts={prods} />;
	});

	on('/category/:id/:title/:sub', async (state) => {
		await CategoryStore.fetchCategory(state.params.id);
		const cat = CategoryStore.getCategory(state.params.id);
		let prods = [];

		if (!cat.vehicle_specific) {
			await	CategoryStore.fetchProducts(state.params.id);
			prods = CategoryStore.getProducts();
		}

		return <Category context={state.context} category={cat} categoryProducts={prods} />;
	});

	on('/search/:term', async (state) => {
		await SearchStore.fetchSearchResults(state.params.term);
		return <SearchResults context={state.context} />;
	});

	on('/search', async (state) => {
		await SearchStore.fetchSearchResults(state.query.term);
		return <SearchResults context={state.context} />;
	});

	on('/vehicle', async (state) => {
		state.context.params = state.params;
		if (brand.id === 4) {
			return <LuverneResults context={state.context} />;
		}
		return <VehicleResults context={state.context} />;
	});

	on('/vehicle/:year', async (state) => {
		state.context.params = state.params;
		if (brand.id === 4) {
			return <LuverneResults context={state.context} />;
		}
		return <VehicleResults context={state.context} />;
	});

	on('/vehicle/:year/:make', async (state) => {
		state.context.params = state.params;
		if (brand.id === 4) {
			return <LuverneResults context={state.context} />;
		}
		return <VehicleResults context={state.context} />;
	});

	on('/vehicle/:year/:make/:model', async (state) => {
		state.context.params = state.params;
		const tmp = {
			base: {
				year: state.params.year,
				make: state.params.make,
				model: state.params.model,
			},
		};
		if (brand.id === 4) {
			tmp.base_vehicle = tmp.base;
			tmp.base = [];
			cookie.save('vehicleluverne', JSON.stringify(tmp), { path: '/' });
			await LuverneStore.fetchVehicle(state.params.year, state.params.make, state.params.model);
			return <LuverneResults context={state.context} win={state.win} />;
		}
		cookie.save('vehicle', JSON.stringify(tmp), { path: '/' });
		await Promise.all([
			VehicleStore.fetchVehicle(state.params.year, state.params.make, state.params.model),
			VehicleStore.fetchEnvision(state.params.year, state.params.make, state.params.model),
		]);
		return <VehicleResults context={state.context} window={state.win} />;
	});

	on('/about', async (state) => {
		return <About context={state.context} />;
	});

	on('/appguides', async (state) => {
		await AppGuideStore.fetchAppGuides();
		return <AppGuides context={state.context} />;
	});

	on('/appguides/:guide/:page', async (state) => {
		const collection = state.params.guide;
		const page = state.params.page;
		await AppGuideStore.fetchAppGuide(collection, page);
		return <AppGuide context={state.context} />;
	});

	on('/becomedealer', async (state) => {
		await GeographyStore.fetchCountries();
		return <BecomeDealer context={state.context} />;
	});

	on('/contact', async (state) => {
		Promise.all([
			ContactStore.fetchTypes(),
			GeographyStore.fetchCountries(),
		]);

		return <Contact context={state.context} />;
	});

	on('/terms', async (state) => {
		return <Terms context={state.context} />;
	});

	on('/news', async (state) => {
		return <LatestNews context={state.context} />;
	});

	on('/news/:id', async (state) => {
		await SiteStore.fetchNewsItem(state.params.id);
		return <LatestNewsItem context={state.context} />;
	});

	on('/buy', async (state) => {
		state.context.id = state.params.id;
		return <WhereToBuy context={state.context} google={state.google} navigator={state.navigator} />;
	});

	on('/warranties', async (state) => {
		state.context.id = state.params.id;
		return <Warranties context={state.context} />;
	});

	on('/styleguard', (state, next) => {
		state.redirect = '/category/321/Interior/StyleGuard%20Floor%20Liners';
		next();
	});

	on('/page/:id', async (state) => {
		state.context.id = state.params.id;
		console.log(state.context);
		if (state.context.siteContents) {
			for (let i = 0; i < state.context.siteContents.length; i++) {
				if (state.context.siteContents[i].id.toString() === state.params.id) {
					state.context.customContent = state.context.siteContents[i];
				}
			}
		}
		return <CustomContent context={state.context} />;
	});

	on('/lp/:id', async (state) => {
		await SiteStore.fetchLandingPage(state.params.id);
		return <LandingPage context={state.context} />;
	});

	on('/', async (state) => {
		await Promise.all([
			ProductStore.fetchFeatured(),
			SiteStore.fetchTestimonials(),
		]);
		return <Home context={state.context} />;
	});

	on('error', (state, error) => state.statusCode === 404 ?
		<App context={state.context} error={error}><NotFoundPage /></App> :
		<App context={state.context} error={error}><ErrorPage /></App>
	);
});

export default router;
