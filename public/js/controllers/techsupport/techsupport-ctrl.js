/**
 * Tech Support definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('TechSupportController', ['$scope', 'TechSupportService', function($scope, TechSupportService){
		$scope.techSupport = {};
		$scope.techSupport.contact = {};
		$scope.message = "";


		$scope.submitTechSupport = function(techSupport){
			if(techSupport.purchaseDate == null){alert("Purchase Date cannot be empty.");}
			techSupport.purchaseDate = new Date(techSupport.purchaseDate);
			
			if(techSupport.vehicleYear != null && isNaN(techSupport.vehicleYear)){alert("Vehicle year must be a number.")};
			techSupport.vehicleYear = parseInt(techSupport.vehicleYear);
			
			TechSupportService.SubmitTechSupport(techSupport)
			.then(function(data){
				$scope.techSupport = {};
				$scope.message = "Request sent.";
			});
		}
		
	}]);
});