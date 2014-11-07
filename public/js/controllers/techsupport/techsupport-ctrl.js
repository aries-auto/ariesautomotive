/**
 * Tech Support definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('TechSupportController', ['$scope', 'TechSupportService', function($scope, TechSupportService){
		$scope.techSupport = {};
		$scope.techSupport.contact = {};
		// $scope.contactReceivers = {};//tech support personel

		$scope.message = "";
		$scope.dateMessage = "";

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
});