'use strict';

angular.module('ariesautomotive').controller('ContactController', ['$scope', 'ContactService','BecomeDealerService', 'GeographyService', '$rootScope',
	function($scope, ContactService, BecomeDealerService, GeographyService, $rootScope){
	$scope.formData = {'sendEmail': true};

	$rootScope.pageTitle = "ARIES Automotive | Contact Us";
  $rootScope.pageDesc = "Finding grille guards, bull bars, side bars and other ARIES parts for your vehicle is easy using the ARIES product search bar and part lookup tool.";
  $rootScope.pageKywds = "aries, automotive, product search";

	$scope.postForm = function(){
		$scope.errorMessage = '';
		$scope.successMessage = '';

		ContactService.PostContactData(JSON.stringify($scope.formData), $scope.formData.type).then(function(resp){
			if(resp.id > 0){
				$scope.formData = {'sendEmail': true};
				$scope.successMessage = 'Thank you. We have received your request.\n';
			}

		},function(err){
			var errMessage = 'Uh Oh! An error occurred while processing your request.\n';
			errMessage += err;
			$scope.errorMessage = errMessage;
		});
	};

	ContactService.GetContactTypes().then(function(types){
		$scope.contactTypes = types;
	});

	BecomeDealerService.GetBusinessClasses().then(function(classes){
		$scope.businessClasses = classes;
	});

	GeographyService.GetCountryStates().then(function(countries){
		$scope.countries = countries;
	});
}]);
