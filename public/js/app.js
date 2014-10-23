/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
	'angular',
	'ui.router',
	'ngSanitize',
	'./config',
	'./controllers/index/index',
	'./controllers/contact/index',
	'./controllers/category/index',
	'./controllers/part/index',
	'./services/services'
], function (angular) {
	'use strict';

	return angular.module('app', [
		'app.constants',
		'app.services',
		'app.index',
		'app.contact',
		'app.category',
		'app.part',
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
		CategoryService.GetParents(function(parentCats, err){
			if(err){
				return;
			}
			$scope.parentCats = parentCats;
		});
	}])
});