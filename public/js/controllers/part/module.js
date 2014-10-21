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
		$stateProvider
			.state('part', {
				templateUrl: 'js/modules/index/index.html',
				controller: function ($scope, $inject) {
				},
				resolve: {
				}
		});
	});

});