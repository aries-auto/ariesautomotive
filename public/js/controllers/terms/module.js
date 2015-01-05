define([
	'angular',
	'ui.router',
	'../../config'
], function (angular) {
	'use strict';

	return angular.module('app.terms', [
		'app.constants',
		'ui.router'
	]).config(function ($stateProvider) {
		var partState = {
			name: 'terms',
			url: '/terms',
			views:{
				'body':{
					templateUrl: '/js/controllers/terms/index.html',
					controller: 'TermsController'
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