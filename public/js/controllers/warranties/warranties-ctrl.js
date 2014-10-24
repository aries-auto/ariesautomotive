/**
 * AboutUs controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('WarrantiesController',  ['$scope', 'WarrantyService',function($scope, WarrantyService){

		$scope.message = "Click this button:"

		$scope.states = {};
		$scope.update = function(){
			$scope.states = this.warranty.contact.country.states;
		}

		$scope.countrystates = WarrantyService.GetCountryStates()
			.then(function(data){
				$scope.countrystates = data;
			})

		$scope.submitWarranty = function(warranty){
			if(techSupport.purchaseDate == null){$scope.dateMessage = "This field cannot be empty."; return;}
			warranty.date = new Date(warranty.date);
			
			if(warranty.partNumber != null && isNaN(warranty.partNumber)){alert("Part number must be a number.");return};
			warranty.partNumber = parseInt(warranty.partNumber);
			
			WarrantyService.SubmitWarranty(warranty)
			.then(function(data){
				$scope.warranty = {};
				$scope.dateMessage = {};
				$scope.message = "Request sent."
			});
		}
		
	}]);
});