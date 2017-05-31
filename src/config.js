export const port = process.env.PORT || 8085;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const googleApiKey = process.env.GOOGLE_API_KEY || 'AIzaSyDn9YGVNo4kN7qqDD8t1qf613K6S0TTxuA';
export const hostAddress = process.env.WEBSITE_ADDRESS || `http://${host}`;

let iapi = '';
let api = '';
let cachePrefix = '';
switch (process.env.NODE_ENV) {
case 'staging':
	iapi = 'http://104.154.72.47';
	api = 'http://104.155.147.144';
	cachePrefix = 'staging';
	break;
case 'production':
	iapi = 'http://iapi.curtmfg.com';
	api = 'http://goapi.curtmfg.com';
	cachePrefix = 'production';
	break;
default:
	iapi = 'http://iapi.curtmfg.com';
	api = 'http://goapi.curtmfg.com';
	cachePrefix = 'local';
}

export const iapiBase = iapi;
export const apiBase = api;
export const envisionAPI = 'http://www.iconfigurators.com/ap-json/ap-image-AR-part-id.aspx';
export const memcachePrefix = cachePrefix;
export const apiKey = process.env.API_KEY !== undefined && process.env.API_KEY !== 'undefined' ? process.env.API_KEY : '9300f7bc-2ca6-11e4-8758-42010af0fd79';

// Hides Where To Buy during development and review
const hideBuy = process.env.HIDE_BUY ? true : false;

const aries = {
	id: 3,
	name: 'ARIES Automotive',
	description: 'ARIES Automotive - Whatever terrain you choose to conquer, do it with style and do it with ARIES.',
	seoDesc: 'They change the rules, so we make up our own. They put up road blocks; we find a way around. They tell us there is no path ahead; we blaze a trail. At ARIES, we get revved up about going off the beaten path. From our Pro Series grille guards and modular Jeep bumpers to our StyleGuard™ floor liners and Seat Defenders, ARIES offers freedom of customization and a perfect fit for your vehicle. So whatever terrain you choose to conquer, do it with style and do it with ARIES.',
	code: 'ARIES',
	facebook: {
		link: 'https://www.facebook.com/pages/Aries-Automotive-Inc/113778149023',
	},
	youtube: 'AriesAutomotive',
	twitter: '@ariesautomotive',
	hideWTB: hideBuy,
	defaultContactType: 28,
	copyrightStart: 1997,
	pricing: true,
	logo: 'https://storage.googleapis.com/aries-logo/SVG_Logo%20(2c_white%20with%20black%20outline%20on%20transparent).svg',
	seoLogo: 'https://storage.googleapis.com/aries-logo/ARIES%20Logo%20(1c_red%20on%20transparent_small).png',
	footerLogo: 'https://storage.googleapis.com/aries-logo/aries_logo__web_footer_red_on_trans_sm.png',
	contactHeroImage: 'https://storage.googleapis.com/aries-website/aries-building-1.png',
  shareImage: 'https://storage.googleapis.com/aries-logo/ariesshare.png',
	website: 'http://www.ariesautomotive.com',
	favicons: {
		version: '2.1',
		apple: [
			{
				rel: 'apple-touch-icon-precomposed',
				sizes: '152x152',
				href: 'https://storage.googleapis.com/aries-website/favicons/apple-icon-152x152.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '72x72',
				href: 'https://storage.googleapis.com/aries-website/favicons/apple-icon-72x72.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '144x144',
				href: 'https://storage.googleapis.com/aries-website/favicons/apple-icon-144x144.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '120x120',
				href: 'https://storage.googleapis.com/aries-website/favicons/apple-icon-120x120.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '114x114',
				href: 'https://storage.googleapis.com/aries-website/favicons/apple-icon-114x114.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '57x57',
				href: 'https://storage.googleapis.com/aries-website/favicons/apple-icon-57x57.png',
			}, {
				rel: 'icon',
				sizes: '32x32',
				href: 'https://storage.googleapis.com/aries-website/favicons/favicon-32x32.png',
			},
		],
		microsoft: [
			{
				name: 'msapplication-TileColor',
				content: '#ffffff',
			}, {
				name: 'msapplication-TileImage',
				content: 'https://storage.googleapis.com/aries-website/favicons/apple-icon-144x144.png',
			},
		],
	},
	googleAnalyticsId: 'UA-61502306-1',
};

const luverne = {
	id: 4,
	name: 'Luverne Truck Equipment',
	description: 'LTE',
	seoDesc: 'Luverne Truck Equipment',
	code: 'LUVERNE',
	facebook: {
		link: '',
	},
	youtube: '',
	twitter: '@lte',
	hideWTB: hideBuy,
	defaultContactType: 49,
	pricing: false,
	logo: 'https://storage.googleapis.com/luverne/logos/Luverne%20Logo%20(1c_white%20on%20transparent).svg',
	seoLogo: 'https://storage.googleapis.com/luverne/logos/Luverne%20Logo%20(1c_black%20on%20transparent).png',
	footerLogo: 'https://storage.googleapis.com/luverne/logos/Luverne%20Logo%20(1c_white%20on%20transparent).svg',
	contactHeroImage: 'https://storage.googleapis.com/luvere_site_content/Exterior%20-%20Luverne%20-%20Summer%20(4v1).jpg',
	website: 'http://www.luvernetruck.com',
	favicons: {
		version: '2.1',
		apple: [
			{
				rel: 'apple-touch-icon-precomposed',
				sizes: '152x152',
				href: 'https://storage.googleapis.com/luverne/website/favicons/apple-icon-152x152.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '72x72',
				href: 'https://storage.googleapis.com/luverne/website/favicons/apple-icon-72x72.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '144x144',
				href: 'https://storage.googleapis.com/luverne/website/favicons/apple-icon-144x144.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '120x120',
				href: 'https://storage.googleapis.com/luverne/website/favicons/apple-icon-120x120.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '114x114',
				href: 'https://storage.googleapis.com/luverne/website/favicons/apple-icon-114x114.png',
			}, {
				rel: 'apple-touch-icon-precomposed',
				sizes: '57x57',
				href: 'https://storage.googleapis.com/luverne/website/favicons/apple-icon-57x57.png',
			}, {
				rel: 'icon',
				sizes: '32x32',
				href: 'https://storage.googleapis.com/luverne/website/favicons/favicon-32x32.png',
			},
		],
		microsoft: [
			{
				name: 'msapplication-TileColor',
				content: '#ffffff',
			}, {
				name: 'msapplication-TileImage',
				content: 'https://storage.googleapis.com/luverne/website/favicons/apple-icon-144x144.png',
			},
		],
	},
	googleAnalyticsId: 'UA-86423281-1',
};


export const brand = process.env.BRAND && process.env.BRAND === 'luverne' ? luverne : aries;

export const siteMenu = [
	{
		href: '/buy',
		title: 'Where To Buy',
		value: 'WHERE TO BUY',
	},
	{
		href: 'http://orders.ariesautomotive.com/',
		title: 'ComNET',
		value: 'COMNET',
		external: true,
	},
	{
		href: 'http://dealers.ariesautomotive.com/',
		title: 'Dealer Portal',
		value: 'DEALER PORTAL',
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
