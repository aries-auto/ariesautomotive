define([
	'angular',
	'ui.router',
	'../../config'
], function (angular) {
	'use strict';

	return angular.module('app.contact', [
		'app.constants',
		'ui.router'
	]).config(function ($stateProvider) {
		$stateProvider
			.state('contact', {
				url: '/contact',
				controller: 'ContactController'
			});
	});
});