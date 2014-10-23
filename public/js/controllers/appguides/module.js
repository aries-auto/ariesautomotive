define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.appguides', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]).config(function ($stateProvider) {
		var catState = {
			name: 'appguides',
			url: '/appguides',
			views:{
				'body':{
					templateUrl: '/js/controllers/appguides/index.html',
					controller: 'AppGuidesController'
				}
			}
		};
		$stateProvider.state(catState);
	});

});