/**
 * Tech Support definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('TechSupportController', ['$scope', 'TechSupportService', function($scope, TechSupportService){
		$scope.techSupport = {};
		$scope.techSupport.contact = {};
		$scope.message = "Submit when ready:";
		$scope.dateMessage;
		

		var currentYear = new Date().getFullYear()+1, years = [];
        var startYear =  1963;
        while (currentYear >= startYear ) {
                years.push(currentYear--);
        } 
        $scope.years = years;
          



		$scope.submitTechSupport = function(techSupport){
			if(techSupport.purchaseDate == null){$scope.dateMessage = "This field cannot be empty."; return;}
			techSupport.purchaseDate = new Date(techSupport.purchaseDate);
			
			if(techSupport.vehicleYear != null && isNaN(techSupport.vehicleYear)){alert("Vehicle year must be a number.");return};
			techSupport.vehicleYear = parseInt(techSupport.vehicleYear);
			
			TechSupportService.SubmitTechSupport(techSupport)
			.then(function(data){
				$scope.techSupport = {};
				$scope.dateMessage = {};
				$scope.message = "Request sent.";
			});
		}
		
	}]);
});