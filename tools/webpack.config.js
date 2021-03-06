import path from 'path';
import webpack from 'webpack';
import merge from 'lodash.merge';
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const LUVERNE = process.argv.includes('--luverne');
const HIDE_BUY = process.argv.includes('--hide-buy');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 35',
	'Firefox >= 31',
	'Explorer >= 9',
	'iOS >= 7',
	'Opera >= 12',
	'Safari >= 7.1',
];
const GLOBALS = {
	'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
	'process.env.BRAND': LUVERNE ? '"luverne"' : '"aries"',
	'process.env.HIDE_BUY': HIDE_BUY ? true : false,
	__DEV__: DEBUG,
};

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
	output: {
		publicPath: '/',
		sourcePrefix: '  ',
	},

	cache: DEBUG,
	debug: DEBUG,

	stats: {
		colors: true,
		reasons: DEBUG,
		hash: VERBOSE,
		version: VERBOSE,
		timings: true,
		chunks: VERBOSE,
		chunkModules: VERBOSE,
		cached: VERBOSE,
		cachedAssets: VERBOSE,
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
	],

	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, '../node_modules/react-routing/src'),
					path.resolve(__dirname, '../src'),
				],
				loaders: ['babel-loader', 'eslint'],
			}, {
				test: /\.css/,
				include: /node_modules/,
				loaders: [
					'isomorphic-style-loader',
					`css-loader?${JSON.stringify({
						sourceMap: DEBUG,
						// CSS Modules https://github.com/css-modules/css-modules
						modules: false,
						localIdentName: '[local]',
						// CSS Nano http://cssnano.co/options/
						minimize: true,
					})}`,
					'postcss-loader?pack=default',
				],
			}, {
				test: /\.css/,
				exclude: /node_modules/,
				loaders: [
					'isomorphic-style-loader',
					`css-loader?${JSON.stringify({
						sourceMap: DEBUG,
						// CSS Modules https://github.com/css-modules/css-modules
						modules: true,
						localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
						// CSS Nano http://cssnano.co/options/
						minimize: true,
					})}`,
					'postcss-loader?pack=default',
				],
			}, {
				test: /\.scss$/,
				loaders: [
					'isomorphic-style-loader',
					'css-loader?minimize&' + (DEBUG ? 'sourceMap&' : 'sourceMap&') +
					'modules&localIdentName=[name]_[local]_[hash:base64:3]',
					'postcss-loader?pack=sass',
				],
			}, {
				test: /\.json$/,
				loader: 'json-loader',
			}, {
				test: /\.txt$/,
				loader: 'raw-loader',
			}, {
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				loader: 'url-loader?limit=10000',
			}, {
				test: /\.(eot|ttf|wav|mp3)$/,
				loader: 'file-loader',
			},
		],
	},

	postcss(bundler) {
		return {
			default: [
				require('postcss-import')({ addDependencyTo: bundler }),
				require('precss')(),
				require('postcss-color-function'),
				require('postcss-media-minmax'),
				require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
			],
			sass: [
				require('postcss-import')({ addDependencyTo: bundler }),
				require('precss')(),
				require('postcss-media-minmax'),
				require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
			],
		};
	},
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = merge({}, config, {
	entry: ['./src/client.js'],
	output: {
		path: path.join(__dirname, '../build/public'),
		filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
	},

	// Choose a developer tool to enhance debugging
	// http://webpack.github.io/docs/configuration.html#devtool
	devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
	plugins: [
		new webpack.DefinePlugin(GLOBALS),
		new webpack.DefinePlugin({
			'process.env': Object.keys(process.env).reduce((o, k) => {
				o[k] = JSON.stringify(process.env[k]);
				return o;
			}, {}),
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new AssetsPlugin({
			path: path.join(__dirname, '../build'),
			filename: 'assets.js',
			processOutput: x => `module.exports = ${JSON.stringify(x)};`,
		}),
		...(!DEBUG ? [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
					screw_ie8: true,

					// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
					warnings: VERBOSE,
				},
			}),
			new webpack.optimize.AggressiveMergingPlugin(),
		] : []),
	],
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const gcloudPlugins = process.env.NODE_ENV === 'production' ? [
	new webpack.BannerPlugin(
		'require("@google/cloud-debug");',
		{ raw: true, entryOnly: false },
	),
	new webpack.BannerPlugin(
		'require("@google/cloud-trace").start();',
		{ raw: true, entryOnly: false },
	),
] : [];

const serverConfig = merge({}, config, {
	entry: './src/server.js',
	output: {
		path: './build',
		filename: 'server.js',
		libraryTarget: 'commonjs2',
	},
	target: 'node',
	externals: [
		/^\.\/assets$/,
		function filter(context, request, cb) {
			const isExternal =
			request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
			!request.match(/^react-routing/) &&
			!context.match(/[\\/]react-routing/);
			cb(null, Boolean(isExternal));
		},
	],
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
	},
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin(GLOBALS),
		new webpack.BannerPlugin('require("source-map-support").install();',
		{ raw: true, entryOnly: false }),
		...gcloudPlugins,
	],
});

export default [clientConfig, serverConfig];
