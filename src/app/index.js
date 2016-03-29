'use strict';

angular.module('ariesautomotive', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngDialog', 'ui.router', 'ui.bootstrap', 'LocalStorageModule', 'uiGmapgoogle-maps', 'bootstrapLightbox', 'angularSpinner', 'angular.filter', 'ngMdIcons', 'angulartics', 'angulartics.google.analytics'])
	.config(function ($stateProvider, $urlRouterProvider, $interpolateProvider, $locationProvider, localStorageServiceProvider, uiGmapGoogleMapApiProvider, LightboxProvider) {
		var lookupState = {
			templateUrl: 'app/controllers/lookup/index.html',
			controller: 'LookupController'
		};
		jQuery.ajaxSetup({
			cache: true
		});
		$stateProvider
			.state('home', {
				url: '/',
				views: {
					'body': {
						templateUrl: 'app/controllers/main/index.html',
						controller: 'MainController'
					},
					'lookup': lookupState
				}
			})
			.state('aboutus', {
				url: '/about',
				views: {
					'body': {
						templateUrl: 'app/controllers/aboutus/index.html',
						controller: 'AboutUsController'
					},
					'lookup': lookupState
				}
			})
			.state('part', {
				url: '/part/:id',
				views: {
					'body': {
						templateUrl: 'app/controllers/part/index.html',
						controller: 'PartController'
					},
					'lookup': lookupState
				}
			}).state('category', {
				url: '/category/:id',
				views: {
					'body': {
						templateUrl: 'app/controllers/category/index.html',
						controller: 'CategoryController'
					},
					'lookup': lookupState
				}
			}).state('lp', {
				url: '/lp/:id',
				views: {
					'body': {
						templateUrl: 'app/controllers/lp/index.html',
						controller: 'LPController'
					},
					'lookup': lookupState
				}
			}).state('appguides', {
				url: '/appguides',
				views: {
					'body': {
						templateUrl: 'app/controllers/appguides/index.html',
						controller: 'AppGuidesController'
					},
					'lookup': lookupState
				}
			}).state('appguide', {
				url: '/appguides/:collection',
				views: {
					'body': {
						templateUrl: 'app/controllers/appguides/appguide.html',
						controller: 'AppGuideController'
					},
					'lookup': lookupState
				}
			}).state('becomedealer', {
				url: '/becomedealer',
				views: {
					'body': {
						templateUrl: 'app/controllers/becomedealer/index.html',
						controller: 'BecomeDealerController'
					},
					'lookup': lookupState
				}
			}).state('contact', {
				url: '/contact',
				views: {
					'body': {
						templateUrl: 'app/controllers/contact/index.html',
						controller: 'ContactController'
					},
					'lookup': lookupState
				}
			}).state('news', {
				url: '/news',
				views: {
					'body': {
						templateUrl: 'app/controllers/news/index.html',
						controller: 'NewsController'
					},
					'lookup': lookupState
				}
			}).state('news item', {
				url: '/news/:id',
				views: {
					'body': {
						templateUrl: 'app/controllers/news/index.html',
						controller: 'NewsController'
					},
					'lookup': lookupState
				}
			}).state('search', {
				url: '/search/:term',
				views: {
					'body': {
						templateUrl: 'app/controllers/search/index.html',
						controller: 'SearchController'
					},
					'lookup': lookupState
				}
			}).state('techsupport', {
				url: '/techsupport',
				views: {
					'body': {
						templateUrl: 'app/controllers/techsupport/index.html',
						controller: 'TechSupportController'
					},
					'lookup': lookupState
				}
			}).state('terms', {
				url: '/terms',
				views: {
					'body': {
						templateUrl: 'app/controllers/terms/index.html',
						controller: 'TermsController'
					},
					'lookup': lookupState
				}
			}).state('lookup_vehicle', {
				url: '/vehicle/:year/:make/:model',
				views: {
					'body': {
						templateUrl: 'app/controllers/vehicle/index.html',
						controller: 'VehicleController'
					},
					'lookup': lookupState
				}
			}).state('warranties', {
				url: '/warranties',
				views: {
					'body': {
						templateUrl: 'app/controllers/warranties/index.html',
						controller: 'WarrantiesController'
					},
					'lookup': lookupState
				}
			}).state('where_to_buy', {
				url: '/buy',
				views: {
					'body': {
						templateUrl: 'app/controllers/wheretobuy/index.html',
						controller: 'BuyController'
					},
					'lookup': lookupState
				}
			}).state('where_to_buy_linked', {
				url: '/buy/:location',
				views: {
					'body': {
						templateUrl: 'app/controllers/wheretobuy/index.html',
						controller: 'BuyController'
					},
					'lookup': lookupState
				}
			}).state('iconfig', {
				url: '/iconfig',
				views: {
					'body': {
						templateUrl: 'app/controllers/iconfig/index.html',
						controller: 'IconfigController'
					},
					'lookup': lookupState
				}
			}).state('envision', {
				url: '/envision',
				views: {
					'body': {
						templateUrl: 'app/controllers/iconfig/index.html',
						controller: 'IconfigController'
					}
				}
			});
		$urlRouterProvider.otherwise('/');
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
		$locationProvider.html5Mode(true);
		localStorageServiceProvider.setPrefix('ariesauto').setStorageType('sessionStorage');
		LightboxProvider.templateUrl = 'app/controllers/main/whatsNewLightbox.html';
		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyDn9YGVNo4kN7qqDD8t1qf613K6S0TTxuA',
			v: '3.17',
			libraries: 'places'
		});
	});
