'use strict';

angular.module('ariesautomotive').controller('BecomeDealerController', ['$scope','BecomeDealerService','GeographyService', '$rootScope', 'TitleService', function($scope, BecomeDealerService, GeographyService, $rootScope, TitleService){
	$scope.contact = {};
	$scope.message = "";

	var titleText = "Aries Automotive - Become an Aries Automotive dealer";
	$rootScope.titleservice = TitleService;
	$rootScope.titleservice.set(titleText);

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
