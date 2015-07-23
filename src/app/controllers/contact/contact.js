'use strict';

angular.module('ariesautomotive').controller('ContactController', ['$scope', 'ContactService','BecomeDealerService', 'GeographyService', '$rootScope', 'TitleService',
	function($scope, ContactService, BecomeDealerService, GeographyService, $rootScope, TitleService){
	$scope.formData = {'sendEmail': true};

	var titleText = "Contact Us | Conctact Resources for ARIES Automotive";
	$rootScope.titleservice = TitleService;
	$rootScope.titleservice.set(titleText);

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
