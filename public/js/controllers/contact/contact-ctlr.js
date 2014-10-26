/**
 * Contact controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('ContactController', ['$scope', 'ContactService', 'GeographyService', function($scope, ContactService, GeographyService){
		ContactService.GetContactTypes(function(types, err){
			if(err){
				console.log(err);
				return;
			}
			$scope.contactTypes = types;
		});
		
		GeographyService.GetCountryStates(function(countries, err){
			if(err){
				console.log(err);
				return;
			}
			$scope.countries = countries;
		});
	}]);
});