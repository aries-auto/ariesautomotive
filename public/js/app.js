/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
	'angular',
	'ui.router',
	'./config',
	'./controllers/index/index',
	'./controllers/lookup/index',
	'./controllers/parts/index',
	'./controllers/category/index',
	'./directives/integer',
	'./directives/inView',
	'./services/lookup'
], function (angular) {
	'use strict';

	return angular.module('app', [
		'app.constants',
		'app.index',
		'app.lookup',
		'app.parts',
		'app.category',
		'app.services',
		'app.directives',
		'ui.router'
	]).config(function ($urlRouterProvider,$interpolateProvider) {
		$urlRouterProvider.otherwise('/');
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	});

});