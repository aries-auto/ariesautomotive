define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.part', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]).config(function ($stateProvider) {
		var partState = {
			name: 'part',
			url: '/part/:id',
			views:{
				'body':{
					templateUrl: '/js/controllers/part/index.html',
					controller: 'PartController'
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