'use strict';

angular.module('ariesautomotive').controller('TechSupportController', ['$scope', 'TechSupportService', '$rootScope', 'TitleService', function($scope, TechSupportService, $rootScope, TitleService){
	$scope.techSupport = {};
	$scope.techSupport.contact = {};

	$scope.message = "";
	$scope.dateMessage = "";

	var titleText = "Technical Support - Aries Automotive";
	$rootScope.titleservice = TitleService;
	$rootScope.titleservice.set(titleText);

	$scope.submitTechSupport = function(techSupport){

		if(techSupport.purchaseDate === undefined || techSupport.purchaseDate === null || techSupport.purchaseDate === "Invalid date"){
			$scope.dateMessage = "This field cannot be empty";
			return;
		}
		techSupport.purchaseDate = new Date(techSupport.purchaseDate);

		if(techSupport.vehicleYear !== null && isNaN(techSupport.vehicleYear)){
			alert("Vehicle year must be a number.");
			return;
		}

		techSupport.vehicleYear = parseInt(techSupport.vehicleYear);

		var def = TechSupportService.SubmitTechSupport(techSupport);
		def.then(function(data){
			$scope.techSupport = {};

			$scope.message = "Request sent.";
		}).catch(function(err){
			$scope.message = 'Failed to submit your support request, please call our help line.';
		});
	}

	TechSupportService.GetTechSupportContactReceivers().then(function(data){
		$scope.contactReceivers = data;
	});
}]);
