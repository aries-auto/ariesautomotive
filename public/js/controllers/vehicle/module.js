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
		$stateProvider.state({
			name: 'full_vehicle',
			url: '/vehicle/:year/:make/:model/:submodel/{configs:.*}',
			views:{
				'body':{
					templateUrl: '/js/controllers/vehicle/index.html',
					controller: 'VehicleController'
				},
				'lookup':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		});
		$stateProvider.state({
			name: 'sub_vehicle',
			url: '/vehicle/:year/:make/:model/:submodel',
			views:{
				'body':{
					templateUrl: '/js/controllers/vehicle/index.html',
					controller: 'VehicleController'
				},
				'lookup':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		});
		$stateProvider.state({
			name: 'base_vehicle',
			url: '/vehicle/:year/:make/:model',
			views:{
				'body':{
					templateUrl: '/js/controllers/vehicle/index.html',
					controller: 'VehicleController'
				},
				'lookup':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		});
		$stateProvider.state({
			name: 'make_vehicle',
			url: '/vehicle/:year/:make',
			views:{
				'body':{
					templateUrl: '/js/controllers/vehicle/index.html',
					controller: 'VehicleController'
				},
				'lookup':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		});
		$stateProvider.state({
			name: 'year_vehicle',
			url: '/vehicle/:year',
			views:{
				'body':{
					templateUrl: '/js/controllers/vehicle/index.html',
					controller: 'VehicleController'
				},
				'lookup':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		});
		$stateProvider.state({
			name: 'empty_vehicle',
			url: '/vehicle',
			views:{
				'body':{
					templateUrl: '/js/controllers/vehicle/index.html',
					controller: 'VehicleController'
				},
				'lookup':{
					templateUrl: '/js/controllers/lookup/index.html',
					controller: 'LookupController'
				}
			}
		});
	});

});