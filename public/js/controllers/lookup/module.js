define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.lookup', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]).config(function ($stateProvider) {
		var catState = {
			name: 'lookup',
			url: '/lookup',
			views:{
				'body':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		};
		$stateProvider.state(catState);
	});

});