define([
	'angular',
	'ui.router',
	'../../config'
], function (angular) {
	'use strict';

	return angular.module('app.techsupport', [
		'app.constants',
		'ui.router'
	]).config(function ($stateProvider) {
		var partState = {
			name: 'techsupport',
			url: '/techsupport',
			views:{
				'body':{
					templateUrl: '/js/controllers/techsupport/index.html',
					controller: 'TechSupportController'
				}
			}
		};
		$stateProvider.state(partState);
	});

});