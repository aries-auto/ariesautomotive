/**
 * Contact controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('ContactController', ['$scope', 'Geography', function(scope, Geography){
		Geography.GetCountryStates(function(countries, err){
			if(err){
				console.log(err);
				return;
			}
			scope.countries = countries;
		});
	}]);
});