'use strict';

angular.module('ariesautomotive').controller('TechSupportController', ['$scope', 'TechSupportService', '$rootScope', '$analytics', function($scope, TechSupportService, $rootScope, $analytics){
	$scope.techSupport = {};
	$scope.techSupport.contact = {};

	$scope.message = "";
	$scope.dateMessage = "";

	$rootScope.pageTitle = "ARIES Automotive | Technical Support";
	$rootScope.pageDesc = "For questions about ARIES products, vehicle application or installation help, ARIES technical support can be reached by phone or email.";
	$rootScope.pageKywds = "aries, automotive, technical support";

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
			$analytics.eventTrack('techsupport-submitted');
			$scope.message = "Request sent.";
		}).catch(function(err){
			$analytics.eventTrack('techsupport-failed:' + err);
			$scope.message = 'Failed to submit your support request, please call our help line.';
		});
	}

	TechSupportService.GetTechSupportContactReceivers().then(function(data){
		$scope.contactReceivers = data;
	});
}]);
