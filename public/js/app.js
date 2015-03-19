/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
	'angular',
	'ui.router',
	'ngSanitize',
	'ngAnimate',
	'ngTouch',
	'pace',
	'LocalStorageModule',
	'./config',
	'./controllers/app/index',
	'./controllers/search/index',
	'./controllers/index/index',
	'./controllers/aboutus/index',
	'./controllers/appguides/index',
	'./controllers/becomedealer/index',
	'./controllers/contact/index',
	'./controllers/category/index',
	'./controllers/lookup/index',
	'./controllers/part/index',
	'./controllers/vehicle/index',
	'./controllers/techsupport/index',
	'./controllers/terms/index',
	'./controllers/warranties/index',
	'./services/applicationGuide',
	'./services/becomedealer',
	'./services/category',
	'./services/contact',
	'./services/geography',
	'./services/lookup',
	'./services/part',
	'./services/search',
	'./services/vehicle',
	'./services/techSupport',
	'./services/testimonial',
	'./services/warranties',
	'./directives/index'
], function (angular) {
	'use strict';

	return angular.module('app', [
		'app.constants',
		'app.services.applicationGuide',
		'app.services.becomedealer',
		'app.services.category',
		'app.services.contact',
		'app.services.geography',
		'app.services.lookup',
		'app.services.part',
		'app.services.search',
		'app.services.vehicle',
		'app.services.techSupport',
		'app.services.testimonial',
		'app.services.warranties',
		'app.directives.index',
		'app.app',
		'app.search',
		'app.index',
		'app.aboutus',
		'app.appguides',
		'app.becomedealer',
		'app.contact',
		'app.category',
		'app.lookup',
		'app.part',
		'app.vehicle',
		'app.techsupport',
		'app.terms',
		'app.warranties',
		'ui.router',
		'ngSanitize',
		'ngAnimate',
		'ngTouch',
		'LocalStorageModule'
	]).config(function ($urlRouterProvider,$interpolateProvider, $locationProvider, localStorageServiceProvider) {
		$urlRouterProvider.otherwise('/');
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
		$locationProvider.html5Mode(true);
		localStorageServiceProvider.setPrefix('localStorage').setPrefix('ariesauto');
	}).value('AppConfig', {
		APIURL : 'http://ariesautoapi.curtmfg.com',
		APIKEY : '883d4046-8b96-11e4-9475-42010af00d4e'
	})
});
