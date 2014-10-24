/**
 * AboutUs controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('BecomeDealerController', ['$scope','BecomeDealerService','GeographyService', function($scope, BecomeDealerService, GeographyService){
		BecomeDealerService.GetBusinessClasses(function(classes, err){
			if(err !== null){
				console.log(err);
				return;
			}
			$scope.businessClasses = classes;
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