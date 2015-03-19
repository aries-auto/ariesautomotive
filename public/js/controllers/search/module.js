define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.search', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]).config(function ($stateProvider) {
		var partState = {
			name: 'search',
			url: '/search/:term',
			views:{
				'body':{
					templateUrl: '/js/controllers/search/index.html',
					controller: 'SearchController'
				},
				'lookup':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		};
		$stateProvider.state(partState);
	});

});