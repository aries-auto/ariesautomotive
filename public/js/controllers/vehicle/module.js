define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.vehicle', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]).config(function ($stateProvider) {
		var catState = {
			name: 'vehicle',
			url: '/vehicle',
			views:{
				'body':{
					templateUrl: '/js/controllers/vehicle/index.html',
					controller: 'VehicleController'
				// },
				// 'lookup':{
				// 	templateUrl: '/js/controllers/lookup/index.html',
				// 	controller: 'LookupController'
				}
			}
		};
		$stateProvider.state(catState);
	});

});