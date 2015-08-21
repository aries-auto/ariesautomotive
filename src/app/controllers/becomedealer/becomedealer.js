'use strict';

angular.module('ariesautomotive').controller('BecomeDealerController', ['$scope','BecomeDealerService','GeographyService', '$rootScope', function($scope, BecomeDealerService, GeographyService, $rootScope){
	$scope.contact = {};
	$scope.message = "";

	$rootScope.pageTitle = "ARIES Automotive | Become a Dealer | Become a Seller";
  $rootScope.pageDesc = "For the retail store, distribution center and web retailer, ARIES has the marketing resources, technical support and order-fill rate to help you succeed.";
  $rootScope.pageKywds = "aries, dealer, seller, automotive";

	BecomeDealerService.GetBusinessClasses().then(function(classes){
		$scope.businessClasses = classes;
	});

	GeographyService.GetCountryStates().then(function(countries){
		$scope.countries = countries;
	});

	$scope.saveDealer = function(contact){
		contact.type = '15'; //becoming a dealer
		contact.sendEmail = true;
		contact.subject = 'Becoming a Dealer';
		contact.brand = {
			id: 3
		};

		BecomeDealerService.PostContactData(contact).then(function(data){
			$scope.contact = data;
			$scope.message = 'Request sent.';
		});
	};
}]);
