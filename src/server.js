import 'babel-core/polyfill';
import path from 'path';
import zlib from 'zlib';
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
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(morgan('combined'));
server.use(compression());

server.get('/api/categories/:id', (req, res) => {
	memcached.get(`api:categories:v2:${req.params.id}`, (err, val) => {
		if (!err && val) {
			zlib.gunzip(val, (e, result) => {
				if (!e && result) {
					res.status(200).json(result.toString('utf8'));
					return;
				}
			});
		} else {
			fetch(`${apiBase}/category/${req.params.id}?brandID=${brand.id}&key=${KEY}`)
			.then((resp) => {
				return resp.json();
			}).then((data) => {
				zlib.gzip(JSON.stringify(data), (e, result) => {
					if (e) {
						res.status(200).json(data.toString('utf8'));
						return;
					}
					memcached.set(`api:categories:v2:${req.params.id}`, result, 8640, () => {
						res.status(200).json(data);
						return;
					});
				});
			});
		}
	});
});

server.get('/api/categories', (req, res) => {
	memcached.get('api:v2:categories', (err, val) => {
		if (!err && val) {
			res.send(val);
			return;
		}

		fetch(`${apiBase}/category?brandID=${brand.id}&key=${KEY}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:v2:categories', data, 8640, (e) => {
				if (e) {
					res.error(e);
					return;
				}
				res.send(data);
			});
		});
	});
});

server.get('/api/content/all', (req, res) => {
	memcached.get('api:content:all', (err, val) => {
		if (!err && val) {
			res.send(val);
			return;
		}

		fetch(`${apiBase}/site/content/all?siteID=${brand.id}&brandID=${brand.id}&key=${KEY}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:content:all', data, 8640, (e) => {
				if (e) {
					res.error(e);
					return;
				}
				res.send(data);
			});
		});
	});
});

server.get('/api/content', (req, res) => {
	res.end('[]');
});

server.get('/api/content/:slug', (req, res) => {
	const slug = req.params.slug;
	if (slug === '' || slug.indexOf('_ah') !== -1) {
		res.end('[]');
		return;
	}

	memcached.get(`api:content:${slug}`, (err, val) => {
		if (!err && val) {
			res.send(val);
			return;
		}

		fetch(`${apiBase}/site/content/${slug}?siteID=${brand.id}&brandID=${brand.id}&key=${KEY}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set(`api:content:${slug}`, data, 8640, (e) => {
				if (e) {
					res.error(e);
					return;
				}
				res.send(data);
			});
		}).catch((e) => {
			res.send(e);
			res.end();
		});
	});
});

server.get('/api/testimonials', (req, res) => {
	memcached.get('api:testimonials', (err, val) => {
		if (!err && val) {
			res.send(val);
			return;
		}

		fetch(`${apiBase}/testimonials?key=${KEY}&count=2&randomize=true&brandID=${brand.id}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:testimonials', data, 8640, (e) => {
				if (e) {
					res.error(e);
					return;
				}
				res.send(data);
			});
		});
	});
});

server.get('/api/products/featured', (req, res) => {
	memcached.get('api:products:featured', (err, val) => {
		if (!err && val) {
			res.send(val);
			return;
		}

		fetch(`${apiBase}/part/featured?brandID=${brand.id}&key=${KEY}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:products:featured', data, 8640, (e) => {
				if (e) {
					res.error(e);
					return;
				}
				res.send(data);
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
		const data = {
			title: 'Product Information',
			description: 'From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle.',
			css: '',
			body: '',
			entry: assets.main.js,
		};
		const css = [];

		const slugContainer = req.originalUrl;
		const slug = slugContainer.replace('/', '');
		let siteContentResponse = null;
		if (slug !== '' && slug !== '_ahhealth' && slug.indexOf('health') === -1) {
			siteContentResponse = await Promise.all([
				fetch(`${apiBase}/site/content/${slug}?key=${KEY}&brandID=${brand.id}`, { // change this once we switch brand over, hardcoded 4 is for testing
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
						props.image = brand.seoLogo;
					}
					if (!props.title) {
						props.title = brand.name;
					}
					if (!props.description) {
						props.description = brand.description;
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
			data.body = ReactDOM.renderToString(component);
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
