define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.becomedealer', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]).config(function ($stateProvider) {
		var catState = {
			name: 'becomedealer',
			url: '/becomedealer',
			views:{
				'body':{
					templateUrl: '/js/controllers/becomedealer/index.html',
					controller: 'BecomeDealerController'
				}
			}
		};
		$stateProvider.state(catState);
	});

});