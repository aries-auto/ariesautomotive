define([
	'angular',
	'ui.router',
	'../../config'
], function (angular) {
	'use strict';

	return angular.module('app.category', ['ngSanitize'], [
		'app.constants',
		'ui.router',
	]).config(function ($stateProvider, $sceDelegateProvider) {
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