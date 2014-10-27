/**
 * Contact controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('ContactController', ['$scope', 'ContactService','BecomeDealerService', 'GeographyService', 
		function($scope, ContactService, BecomeDealerService, GeographyService){
		$scope.formData = {};

		$scope.postForm = function(){
			//todo: implement this
		};

		ContactService.GetContactTypes(function(types, err){
			if(err){
				console.log(err);
				return;
			}
			$scope.contactTypes = types;
		});

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