/**
 * AboutUs controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('BecomeDealerController', ['$scope','BecomeDealerService','GeographyService',function($scope, BecomeDealerService, GeographyService){
		$scope.contact = {};
		$scope.message = "";
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

		$scope.saveDealer = function(contact){
			contact.contactType = "15"; //becoming a dealer
			contact.sendEmail = true;
			contact.subject = "Becoming a Dealer";


			BecomeDealerService.PostContactData(contact)
				.then(function(data){
					$scope.contact = data;
					$scope.message = "Request sent.";
				});
			};
		


	}]);

});