define({
	// baseUrl: '.',
	// Here paths are set relative to `/source` folder
	paths: {
		'angular': './lib/angular/angular.min',
		'async': './lib/requirejs-plugins/src/async',
		'jquery': './lib/jquery/dist/jquery.min',
		'ngResource': './lib/angular-resource/angular-resource.min',
		'ui.router': './lib/angular-ui-router/release/angular-ui-router',
		'bootstrap':'./lib/bootstrap-sass-official/assets/javascripts/bootstrap',
		'ngSanitize':'./lib/angular-sanitize/angular-sanitize.min',
		'ngAnimate':'./lib/angular-animate/angular-animate.min',
		'ngTouch':'./lib/angular-touch/angular-touch.min',
		'pace':'./lib/pace/pace.min'
	},
	shim: {
		'angular': {
			'deps': ['jquery'],
			'exports': 'angular'
		},
		'ngResource': ['angular'],
		'ngSanitize': ['angular'],
		'ngAnimate': ['angular'],
		'ngTouch': ['angular'],
		'ui.router' : ['angular'],
		'bootstrap':['jquery']
	},
	urlArgs: 'bust=0.0.4'
});