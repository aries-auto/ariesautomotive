define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.category', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]).config(function ($stateProvider) {
		var catState = {
			name: 'category',
			url: '/category/:id',
			views:{
				'body':{
					templateUrl: '/js/controllers/category/index.html',
					controller: 'CategoryController'
				},
				'lookup':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		};
		$stateProvider.state(catState);
	});

});