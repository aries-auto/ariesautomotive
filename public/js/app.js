/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
	'angular',
	'ui.router',
	'./config',
	'./controllers/index/index',
	'./controllers/contact/index',
	'./controllers/category/index',
	'./services/services'
], function (angular) {
	'use strict';

	return angular.module('app', [
		'app.constants',
		'app.services',
		'app.index',
		'app.contact',
		'app.category',
		'ui.router'
	]).config(function ($urlRouterProvider,$interpolateProvider) {
		$urlRouterProvider.otherwise('/');
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	}).value('AppConfig', {
		APIURL : 'http://goapi.curtmfg.com',
		APIKEY : 'eef1922f-2cba-11e4-8758-42010af0fd79'
	});
});