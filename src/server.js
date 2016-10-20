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
import { apiBase, iapiBase, envisionAPI, apiKey, brand } from './config';
import cookie from 'react-cookie';

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

server.get('/api/categories/:id.json', (req, res) => {
	memcached.get(`api:categories:${req.params.id}:${brand.id}`, (err, val) => {
		res.setHeader('Cache-Control', 'public, max-age=86400');
		res.setHeader('Content-Type', 'application/json');
		if (!err && val) {
			zlib.gunzip(val, (e, result) => {
				if (!e && result) {
					res.status(200).json(JSON.parse(result.toString('utf8')));
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
						res.status(200).json(JSON.parse(data.toString('utf8')));
						return;
					}
					memcached.set(`api:categories:${req.params.id}:${brand.id}`, result, 86400, () => {
						res.status(200).json(data);
						return;
					});
				});
			});
		}
	});
});

server.get('/api/envision.json', (req, res) => {
	const year = req.query.year;
	const make = req.query.make;
	const model = req.query.model;
	const key = `api:envision:${year}:${make}:${model}`;
	memcached.get(key, (err, val) => {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'public, max-age=86400');
		if (!err && val) {
			res.json(val);
			return;
		}

		fetch(`${iapiBase}/envision/vehicle?key=${KEY}&year=${year}&make=${make}&model=${model}&brandID=${brand.id}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set(key, data, 86400, () => {
				res.json(data);
			});
		});
	});
});

// http://www.iconfigurators.com/ap-json/ap-image-AR-part-id.aspx?usejson=1&vehicle=1354&part=2164000,204045&color=0&uid=49067876
// /api/envision/image.json?vehicleID=${vehicleID}&colorID=${colorID}&ids=${identifiers}
server.get('/api/envision/image.json', (req, res) => {
	const vehicleID = req.query.vehicleID;
	const colorID = req.query.colorID;
	const ids = req.query.identifiers;
	const key = `api:envision:${vehicleID}:${colorID}:${ids}`;
	memcached.get(key, (err, val) => {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'public, max-age=86400');
		if (!err && val) {
			res.json(val);
			return;
		}

		fetch(`${envisionAPI}?usejson=1&vehicle=${vehicleID}&part=${ids}&color=${colorID || 0}&uid=49067876`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set(key, data, 86400, () => {
				res.json(data);
			});
		});
	});
});

server.get('/api/appguides.json', (req, res) => {
	memcached.get('api:appguides', (err, val) => {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'public, max-age=86400');
		if (!err && val) {
			res.json(val);
			return;
		}

		fetch(`${iapiBase}/appguides/groups?key=${KEY}&brand=${brand.id}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:appguides', data, 86400, () => {
				res.json(data);
			});
		});
	});
});

server.get('/api/appguide/:collection/:page.json', async (req, res) => {
	memcached.get(`api:appguide:${req.params.collection}:${req.params.page}:${brand.id}`, async (err, val) => {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'public, max-age=86400');
		if (!err && val) {
			res.json(val);
			return;
		}
		let guide = {};
		let appGuideInfo = {};
		const [guideResponse, appGuideInfoResponse] = await Promise.all([
			fetch(`${apiBase}/vehicle/mongo/apps?key=${KEY}&brandID=${brand.id}&collection=${req.params.collection}&limit=1000&page=${req.params.page}`, {
				method: 'post',
				headers: {
					'Accept': 'application/json',
				},
			}),
			fetch(`${iapiBase}/appguides/guide?collection=${req.params.collection}&key=${KEY}&brandID=${brand.id}`, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
				},
			}),
		]);
		guide = await guideResponse.json();
		appGuideInfo = await appGuideInfoResponse.json();
		guide.name = req.params.collection;
		guide.appGuide = appGuideInfo;
		memcached.set(`api:appguide:${req.params.collection}:${req.params.page}:${brand.id}`, guide, 86400, () => {
			res.status(200).json(guide);
			return;
		});
	});
});

server.get('/api/categories.json', (req, res) => {
	memcached.get('api:categories', (err, val) => {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'public, max-age=86400');
		if (!err && val) {
			res.json(val);
			return;
		}

		fetch(`${apiBase}/category?brandID=${brand.id}&key=${KEY}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:categories', data, 86400, () => {
				res.json(data);
			});
		});
	});
});

server.get('/api/content/all.json', (req, res) => {
	memcached.get('api:content:all', (err, val) => {
		res.setHeader('Cache-Control', 'public, max-age=86400');
		res.setHeader('Content-Type', 'application/json');
		if (!err && val) {
			res.json(val);
			return;
		}

		fetch(`${apiBase}/site/content/all?siteID=${brand.id}&brandID=${brand.id}&key=${KEY}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:content:all', data, 86400, () => {
				res.json(data);
			});
		});
	});
});

server.get('/api/content/.json', (req, res) => {
	res.setHeader('Cache-Control', 'public, max-age=86400');
	res.setHeader('Content-Type', 'application/json');
	res.json('[]');
});

server.get('/api/content/:slug.json', (req, res) => {
	const slug = req.params.slug;
	if (slug === '' || slug.indexOf('_ah') !== -1) {
		res.json('[]');
		return;
	}

	memcached.get(`api:content:${slug}`, (err, val) => {
		res.setHeader('Cache-Control', 'public, max-age=86400');
		res.setHeader('Content-Type', 'application/json');
		if (!err && val) {
			res.json(val);
			return;
		}

		fetch(`${apiBase}/site/content/${slug}?siteID=${brand.id}&brandID=${brand.id}&key=${KEY}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set(`api:content:${slug}`, data, 86400, () => {
				res.json(data);
			});
		}).catch((e) => {
			res.json(e);
		});
	});
});

server.get('/api/testimonials.json', (req, res) => {
	memcached.get('api:testimonials', (err, val) => {
		res.setHeader('Cache-Control', 'public, max-age=86400');
		res.setHeader('Content-Type', 'application/json');
		if (!err && val) {
			res.json(val);
			return;
		}

		fetch(`${apiBase}/testimonials?key=${KEY}&count=2&randomize=true&brandID=${brand.id}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:testimonials', data, 86400, () => {
				res.json(data);
			});
		});
	});
});

server.get('/api/products/featured.json', (req, res) => {
	memcached.get('api:products:featured', (err, val) => {
		res.setHeader('Cache-Control', 'public, max-age=86400');
		res.setHeader('Content-Type', 'application/json');
		if (!err && val) {
			res.json(val);
			return;
		}

		fetch(`${apiBase}/part/featured?brandID=${brand.id}&key=${KEY}`)
		.then((resp) => {
			return resp.json();
		}).then((data) => {
			memcached.set('api:products:featured', data, 86400, () => {
				res.json(data);
			});
		});
	});
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
	try {
		cookie.plugToRequest(req, res);
		let statusCode = 200;
		const data = {
			title: 'Product Information',
			description: brand.description,
			css: '',
			body: '',
			entry: assets.main.js,
		};
		const css = [];
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
