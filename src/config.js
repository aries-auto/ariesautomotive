export const port = process.env.PORT || 8085;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const googleAnalyticsId = 'UA-61502306-1';
export const googleApiKey = process.env.GOOGLE_API_KEY || 'AIzaSyDn9YGVNo4kN7qqDD8t1qf613K6S0TTxuA';
export const hostAddress = process.env.WEBSITE_ADDRESS || `http://${host}`;

let iapi = '';
let api = '';
switch (process.env.NODE_ENV) {
case 'staging':
	iapi = 'http://104.154.72.47';
	api = 'http://104.155.147.144';
	break;
case 'production':
	iapi = 'http://104.154.72.47';
	api = 'http://104.155.147.144';
	break;
default:
	iapi = 'http://iapi.curtmfg.com';
	api = 'http://goapi.curtmfg.com';
}

export const iapiBase = iapi;
export const apiBase = api;
export const apiKey = process.env.API_KEY !== undefined && process.env.API_KEY !== 'undefined' ? process.env.API_KEY : '9300f7bc-2ca6-11e4-8758-42010af0fd79';

export const brand = {
	id: '3',
	name: 'ARIES Automotive',
	description: 'ARIES Automotive - Whatever terrain you choose to conquer, do it with style and do it with ARIES.',
	code: 'ARIES',
	twitter: '@ariesautomotive',
	defaultContactType: 28,
	logo: 'https://storage.googleapis.com/aries-logo/SVG_Logo%20(2c_white%20with%20black%20outline%20on%20transparent).svg',
	seoLogo: 'https://storage.googleapis.com/aries-logo/ARIES%20Logo%20(1c_red%20on%20transparent_small).png',
};

export const siteMenu = [
	{
		href: '/buy',
		title: 'Where To Buy',
		value: 'WHERE TO BUY',
	},
	{
		href: 'http://orders.ariesautomotive.com/',
		title: 'COMNET Login',
		value: 'COMNET LOGIN',
		external: true,
	},
	{
		href: '/becomedealer',
		title: 'Become a Dealer',
		value: 'BECOME A DEALER',
	},
	{
		href: '/about',
		title: 'About Us',
		value: 'ABOUT US',
	},
	{
		href: '/contact',
		title: 'Contact Us',
		value: 'CONTACT US',
	},
];
