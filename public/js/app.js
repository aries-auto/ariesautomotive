/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
	'angular',
	'ui.router',
	'ngSanitize',
	'pace',
	'./config',
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
	'./services/vehicle',
	'./services/techSupport',
	'./services/testimonial',
	'./services/warranties'
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
		'app.services.vehicle',
		'app.services.techSupport',
		'app.services.testimonial',
		'app.services.warranties',
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
		'ngSanitize'
	]).config(function ($urlRouterProvider,$interpolateProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
		$locationProvider.html5Mode(true);
	}).value('AppConfig', {
		APIURL : 'http://ariesautoapi.curtmfg.com',
		APIKEY : 'eef1922f-2cba-11e4-8758-42010af0fd79'
	}).controller('AppController', ['$scope','CategoryService', function($scope, CategoryService){
		$scope.parentCats = [];
		CategoryService.GetParents().then(function(parentCats){
			$scope.parentCats = parentCats;
		});
	}])
});