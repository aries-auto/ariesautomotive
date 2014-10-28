/**
 * Contact controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('ContactController', ['$scope', 'ContactService','BecomeDealerService', 'GeographyService', 
		function($scope, ContactService, BecomeDealerService, GeographyService){
		$scope.formData = {'sendEmail': true};

		$scope.postForm = function(){
			$scope.errorMessage = '';
			$scope.successMessage = '';
			ContactService.PostContactData(JSON.stringify($scope.formData), function(result, err){
				if(err){
					console.log(err);
					var errMessage = 'Uh Oh! An error occurred while processing your request.\n';
					errorMessage += err.message;
					$scope.errorMessage = errMessage;

					return;
				}
				if(result.id > 0){
					$scope.formData = {'sendEmail': true};
					$scope.successMessage = 'Thank you. We have received your request.\n'; 
				}
			});
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