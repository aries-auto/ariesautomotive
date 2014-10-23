/**
 * Tech Support definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('TechSupportController', ['$scope', 'TechSupportService', function($scope, TechSupportService){
		$scope.techSupport = {};
		$scope.techSupport.contact = {};
		$scope.message = "";

		$scope.techSupport.contact.firstName = "Lewis";


		$scope.submitTechSupport = function(techSupport){
			TechSupportService.SubmitTechSupport(techSupport)
			.then(function(data){
				$scope.techSupport = {};
				$scope.message = "Request sent.";
			});
		}
		
	}]);
});