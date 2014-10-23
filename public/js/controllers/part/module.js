define([
	'angular',
	'ui.router',
	'../../config'
], function (angular) {
	'use strict';

	return angular.module('app.part', [
		'app.constants',
		'ui.router'
	]).config(function ($stateProvider) {
		var partState = {
			name: 'part',
			url: '/part/:id',
			views:{
				'body':{
					templateUrl: '/js/controllers/part/index.html',
					controller: 'PartController'
				}
			}
		};
		$stateProvider.state(partState);
	});

});