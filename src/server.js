import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import fetch from './core/fetch';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';
import { apiBase, apiKey, brandID } from './config';

const server = global.server = express();
const KEY = apiKey;
const BRAND = brandID;
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));

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
		const [siteContentResponse] = await Promise.all([
			fetch(`${apiBase}/site/content/${slug}?key=${KEY}&brandID=${BRAND}`, { // change this once we switch brand over, hardcoded 4 is for testing
				method: 'get',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				},
			}),
		]);

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
