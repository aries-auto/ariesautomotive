import React from 'react';
import ga from 'react-ga';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import BecomeDealer from './components/BecomeDealer';
import Product from './components/Product';
import Category from './components/Category';
import Contact from './components/Contact';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import VehicleResults from './components/VehicleResults';
import WhereToBuy from './components/WhereToBuy';
import About from './components/About';
import AppGuides from './components/AppGuides';
import Terms from './components/Terms';
import TechSupport from './components/TechSupport';
import Warranties from './components/Warranties';
import LatestNews from './components/LatestNews';
import LatestNewsItem from './components/LatestNewsItem';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import { apiBase, apiKey } from './config';

const isBrowser = typeof window !== 'undefined';
const KEY = apiKey;
const gaOptions = { debug: true };
const MyWindowDependentLibrary = isBrowser ? ga.initialize('UA-61502306-1', gaOptions) : undefined;

const router = new Router(on => {
	on('*', async (state, next) => {
		if (!state.context) {
			state.context = {};
		}
		const [yearResponse, catResponse] = await Promise.all([
			fetch(`${apiBase}/vehicle/mongo/allCollections?key=${KEY}`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				},
				body: '{}',
			}),
			fetch(`${apiBase}/category?brandID=3&key=${KEY}`),
		]);

		try {
			state.context.categories = await catResponse.json();
			const vehicleResponse = await yearResponse.json();
			if (vehicleResponse.available_years !== undefined) {
				state.context.years = vehicleResponse.available_years;
			}
		} catch (e) {
			state.context.error = e;
		}
		if (MyWindowDependentLibrary !== undefined) {
			ga.initialize('UA-61502306-1', gaOptions);
		}
		ga.pageview('arieact:' + state.path);
		const component = await next();
		return component && <App context={state.context}>{component}</App>;
	});

	on('/part/:id', async (state) => {
		state.context.id = state.params.id;
		return <Product context={state.context} />;
	});

	on('/category/:id/:title', async (state) => {
		try {
			const url = `${apiBase}/category/${state.params.id}?key=${KEY}`;
			const catResponse = await fetch(url, {
				method: 'get',
			});

			state.context.category = await catResponse.json();
		} catch (e) {
			state.context.error = e;
		}

		return <Category context={state.context} />;
	});

	on('/category/:id/:title/:sub', async (state) => {
		try {
			const url = `${apiBase}/category/${state.params.id}?key=${KEY}`;
			const catResponse = await fetch(url, {
				method: 'get',
			});

			const partURL = `${apiBase}/category/${state.params.id}/parts?key=${KEY}`;
			const partResponse = await fetch(partURL, {
				method: 'get',
			});

			state.context.category = await catResponse.json();
			state.context.category.parts = await partResponse.json();
		} catch (e) {
			state.context.error = e;
		}

		return <Category context={state.context} />;
	});

	on('/search/:term', async (state) => {
		let searchResult = {};
		let term = '';
		try {
			const searchResponse = await fetch(`${apiBase}/search/${state.params.term}?key=${KEY}&brandID=3`);

			searchResult = await searchResponse.json();
			term = state.params.term;
		} catch (e) {
			state.context.error = e;
		}

		return <SearchResults context={state.context} searchResult={searchResult} term={term} />;
	});

	on('/search', async (state) => {
		let searchResult = {};
		let term = '';
		try {
			const searchResponse = await fetch(`${apiBase}/search/${state.query.term}?key=${KEY}&brandID=3`);

			searchResult = await searchResponse.json();
			term = state.query.term;
		} catch (e) {
			state.context.error = e;
		}

		return <SearchResults context={state.context} searchResult={searchResult} term={term} />;
	});

	on('/vehicle', async (state) => {
		state.context.params = state.params;
		return <VehicleResults context={state.context} />;
	});

	on('/vehicle/:year', async (state) => {
		state.context.params = state.params;
		return <VehicleResults context={state.context} />;
	});

	on('/vehicle/:year/:make', async (state) => {
		state.context.params = state.params;
		return <VehicleResults context={state.context} />;
	});

	on('/vehicle/:year/:make/:model', async (state) => {
		state.context.params = state.params;
		return <VehicleResults context={state.context} />;
	});

	on('/about', async (state) => {
		return <About context={state.context} />;
	});

	on('/appguides', async (state) => {
		return <AppGuides context={state.context} />;
	});

	on('/becomedealer', async (state) => {
		return <BecomeDealer context={state.context} />;
	});

	on('/contact', async (state) => {
		return <Contact context={state.context} />;
	});

	on('/terms', async (state) => {
		return <Terms context={state.context} />;
	});

	on('/techsupport', async (state) => {
		return <TechSupport context={state.context} />;
	});

	on('/news', async (state) => {
		return <LatestNews context={state.context} />;
	});

	on('/news/:id', async (state) => {
		state.context.id = state.params.id;
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

	on('/styleguard', async (state) => {
		try {
			const url = `${apiBase}/category/321?key=${KEY}`;
			const catResponse = await fetch(url, {
				method: 'get',
			});
			state.context.category = await catResponse.json();
		} catch (e) {
			state.context.error = e;
		}

		return <Category context={state.context} />;
	});

	on('/', async (state) => {
		state.context.featuredProducts = [];
		state.context.testimonials = [];
		state.context.carouselImages = [
			{
				image: 'http://storage.googleapis.com/aries-website/hero-images/jeep.png',
				text: 'Never Fear the Uncertain Road',
				button_text: 'VIEW BULL BARS',
				link: '/category/332',
				order: 5,
				styles: {
					backgroundImage: 'url(http://storage.googleapis.com/aries-website/hero-images/jeep.png)',
				},
			}, {
				image: 'https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png',
				text: 'Find Out What It Means to Be a Pro',
				button_text: 'VIEW PRO SERIES',
				link: '/category/331',
				order: 2,
				styles: {
					backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png)',
				},
			}, {
				image: 'https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png',
				text: 'Choose Your Configuration and Start Customizing',
				button_text: 'VIEW MODULAR BUMPERS',
				link: '/category/324',
				order: 3,
				styles: {
					backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png)',
				},
			}, {
				image: 'https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg',
				text: 'ARIES Unveils StyleGuard™ as New Name for Floor Liners',
				button_text: 'READ MORE',
				link: '/news/47',
				order: 1,
				styles: {
					backgroundImage: `url('https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg')`,
				},
			}, {
				image: 'https://storage.googleapis.com/aries-website/hero-images/navyjeep.jpg',
				text: 'Decked Out Jeep to Be Donated to Navy SEAL Foundation',
				button_text: 'READ MORE',
				link: '/news/48',
				order: 4,
				styles: {
					backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/navyjeep.jpg)',
				},
			},
		];
		try {
			const featResponse = await fetch(`${apiBase}/part/featured?brandID=3&key=${KEY}`);
			const testResponse = await fetch(`${apiBase}/testimonials?key=${KEY}&count=2&randomize=true&brandID=3`);

			state.context.featuredProducts = await featResponse.json();
			state.context.testimonials = await testResponse.json();
		} catch (e) {
			state.context.error = e;
		}

		return <Home context={state.context} />;
	});

	on('error', (state, error) => state.statusCode === 404 ?
		<App context={state.context} error={error}><NotFoundPage /></App> :
		<App context={state.context} error={error}><ErrorPage /></App>
	);
});

export default router;
