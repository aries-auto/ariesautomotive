define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.warranties', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]).config(function ($stateProvider) {
		var catState = {
			name: 'warranties',
			url: '/warranties',
			views:{
				'body':{
					templateUrl: '/js/controllers/warranties/index.html',
					controller: 'WarrantiesController'
				}
			}
		};
		$stateProvider.state(catState);
	});

});