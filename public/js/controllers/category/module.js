define([
	'angular',
	'ui.router',
	'../../config'
], function (angular) {
	'use strict';

	return angular.module('app.category', [
		'app.constants',
		'ui.router'
	]).config(function ($stateProvider) {
		$stateProvider
			.state('category', {
				templateUrl: 'js/modules/index/index.html',
				controller: function ($scope, $inject) {
				},
				resolve: {
				}
		});
	});

});