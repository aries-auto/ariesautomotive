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
		APIKEY : '883d4046-8b96-11e4-9475-42010af00d4e'
	}).controller('AppController', ['$scope','CategoryService', function($scope, CategoryService){
		$scope.parentCats = [];
		CategoryService.GetParents().then(function(parentCats){
			$scope.parentCats = parentCats;
		});

		$scope.carousel_images = [{
			image:'http://storage.googleapis.com/aries-website/hero-images/truck.png',
			text: 'A NEW ERA OF BULL BARS IS HERE',
			button_text: 'VIEW BULL BARS',
			link: '/category/299'
		},{
			image:'http://storage.googleapis.com/aries-website/hero-images/jeep.png',
			text: 'A NEW ERA OF GRILLE GUARDS IS HERE',
			button_text: 'VIEW PRO SERIES',
			link: '/category/296'
		},{
			image:'https://storage.googleapis.com/aries-website/hero-images/JeepCapture.JPG',
			text: 'A NEW ERA OF BUMPERS IS HERE',
			button_text: 'VIEW BUMPERS',
			link: '/category/332'
		}];
	}])
});
