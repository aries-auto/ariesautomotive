define([
	'angular',
	'ui.router',
	'../../config',
	'ngSanitize'
], function (angular) {
	'use strict';

	return angular.module('app.app', [
		'app.constants',
		'ui.router',
		'ngSanitize',
	]);

});