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
		var contactState = {
			name: 'contact',
			url: '/contact',
			views:{
				'body':{
					templateUrl: '/js/controllers/contact/index.html',
					controller: 'ContactController'
				}
			}
		};
		$stateProvider.state(contactState);
	});
});