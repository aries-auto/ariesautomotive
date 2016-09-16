import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import Memcached from 'memcached';
import morgan from 'morgan';
import compression from 'compression';
import ReactDOM from 'react-dom/server';
import fetch from './core/fetch';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';
import { apiBase, apiKey, brand } from './config';

const memcachedAddr = process.env.MEMCACHE_PORT_11211_TCP_ADDR || 'localhost';
const memcachedPort = process.env.MEMCACHE_PORT_11211_TCP_PORT || '11211';
const memcached = new Memcached(memcachedAddr + ':' + memcachedPort, {
	retries: 2,
	timeout: 500,
	maxExpiration: 86400,
});
const server = global.server = express();
const KEY = apiKey;
const BRAND = brand;
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(morgan('combined'));
server.use(compression());

server.get('/api/vehicle', (req, res) => {
	const key = `api:vehicle:${req.params.year}`;
	memcached.get(key, (err, val) => {
		if (!err && val) {
			res.status(200).json(val);
			return;
		}

		fetch(`${apiBase}/vehicle/category?key=${KEY}&brands=${BRAND}`)
		.then((resp) => resp.json()).then((data) => {
			memcached.set(key, data, 8640, () => {
				res.status(200).json(data);
			});
		}).catch((e) => {
			res.status(500).json({
				error: e,
			});
		});
	});
});

server.get('/api/vehicle/:year', (req, res) => {
	const key = `api:vehicle:${req.params.year}`;
	memcached.get(key, (err, val) => {
		if (!err && val) {
			res.status(200).json(val);
			return;
		}

		fetch(`${apiBase}/vehicle/category/${req.params.year}?key=${KEY}&brands=${BRAND}`)
		.then((resp) => resp.json()).then((data) => {
			memcached.set(key, data, 8640, () => {
				res.status(200).json(data);
			});
		}).catch((e) => {
			res.status(500).json({
				error: e,
			});
		});
	});
});

server.get('/api/vehicle/:year/:make', (req, res) => {
	const key = `api:vehicle:${req.params.year}:${req.params.make}`;
	memcached.get(key, (err, val) => {
		if (!err && val) {
			res.status(200).json(val);
			return;
		}

		fetch(`${apiBase}/vehicle/category/${req.params.year}/${req.params.make}?key=${KEY}&brands=${BRAND}`)
		.then((resp) => resp.json()).then((data) => {
			memcached.set(key, data, 8640, () => {
				res.status(200).json(data);
			});
		}).catch((e) => {
			res.status(500).json({
				error: e,
			});
		});
	});
});

server.get('/api/vehicle/:year/:make/:model', (req, res) => {
	const key = `api:vehicle:${req.params.year}:${req.params.make}:${req.params.model}`;
	memcached.get(key, (err, val) => {
		if (!err && val) {
			res.status(200).json(val);
			return;
		}

		fetch(`${apiBase}/vehicle/category/${req.params.year}/${req.params.make}/${req.params.model}?key=${KEY}&brands=${BRAND}`)
		.then((resp) => resp.json()).then((data) => {
			memcached.set(key, data, 8640, () => {
				res.status(200).json(data);
			});
		}).catch((e) => {
			res.status(500).json({
				error: e,
			});
		});
	});
});

server.get('/api/vehicle/:year/:make/:model/:category', (req, res) => {
	const key = `api:vehicle:${req.params.year}:${req.params.make}:${req.params.model}:${req.params.category}`;
	memcached.get(key, (err, val) => {
		if (!err && val) {
			res.status(200).json(val);
			return;
		}

		fetch(`${apiBase}/vehicle/category/${req.params.year}/${req.params.make}/${req.params.model}/${req.params.category}?withParts=true&key=${KEY}&brands=${BRAND}`)
		.then((resp) => resp.json()).then((data) => {
			memcached.set(key, data, 8640, () => {
				res.status(200).json(data);
			});
		}).catch((e) => {
			res.status(500).json({
				error: e,
			});
		});
	});
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
	try {
		let statusCode = 200;
		const data = { title: 'Product Information', description: 'From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle.', css: '', body: '', entry: assets.main.js };
		const css = [];

		const slugContainer = req.originalUrl;
		const slug = slugContainer.replace('/', '');
		let siteContentResponse = null;
		if (slug !== '' && slug !== '_ahhealth' && slug.indexOf('health') === -1) {
			siteContentResponse = await Promise.all([
				fetch(`${apiBase}/site/content/${slug}?key=${KEY}&brandID=${BRAND}`, { // change this once we switch brand over, hardcoded 4 is for testing
					method: 'get',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json',
					},
				}),
			]);
		}

		try {
			const siteContent = await siteContentResponse.json();
			if (siteContent.metaDescription !== undefined && siteContent.metaTitle !== undefined) {
				data.title = siteContent.metaTitle;
				data.description = siteContent.metaDescription;
			}
		} catch (e) {
			// use default meta title and description
		}
		const context = {
			insertCss: styles => css.push(styles._getCss()),
			onSetTitle: value => data.title = value,
			onSetMeta: (key, value) => data[key] = value,
			onPageNotFound: () => statusCode = 404,
			seo: (seoInput) => {
				const props = seoInput;
				data.metas = {};
				props.url = `${req.get('host')}${req.originalUrl}`;
				if (req.protocol && req.protocol !== '') {
					props.url = req.protocol.concat('://', props.url);
				}
				props.type = 'website';
				props.card = 'summary_large_card';
				const metaTags = [{ use: 'og', label: 'property' }, { use: 'twitter', label: 'name' }];
				metaTags.forEach((tag) => {
					if (!props.image) {
						props.image = 'https://storage.googleapis.com/aries-logo/ARIES%20Logo%20(1c_red%20on%20transparent_small).png';
					}
					if (!props.title) {
						props.title = 'ARIES Automotive';
					}
					if (!props.description) {
						props.description = 'ARIES Automotive - Whatever terrain you choose to conquer, do it with style and do it with ARIES.';
					}
					for (const i in props) {
						if (!i) {
							continue;
						}
						const key = tag.use + ':' + i;
						data.metas[key] = props[i];
					}
				});
			},
		};

		let redirect = null;
		await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
			if (state.redirect) {
				redirect = state.redirect;
			}
			// if (req.path.indexOf('/vehicle') === -1) {
			data.body = ReactDOM.renderToString(component);
			// }
			data.css = css.join('');
		});

		if (redirect) {
			res.redirect(redirect);
			return;
		}

		const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
		res.status(statusCode).send('<!doctype html>\n' + html);
	} catch (err) {
		next(err);
	}
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
	/* eslint-disable no-console */
	console.log(`The server is running at http://localhost:${port}/`);
});
