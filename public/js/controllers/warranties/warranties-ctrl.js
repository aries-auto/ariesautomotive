/**
 * AboutUs controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('WarrantiesController',  ['$scope', 'WarrantyService',function($scope, WarrantyService){

		$scope.message = "Click this button:"
		$scope.partConfirm = false;
		$scope.warranty = {};
		$scope.warranty.contact = {};

		$scope.states = {};
		
		$scope.updateStates = function(){
			$scope.states = this.form.country.states;
			$scope.warranty.contact.country = this.form.country.country;
		}

		$scope.updateState = function(){
			$scope.warranty.contact.state = this.form.state.state;
		}

		$scope.countrystates = WarrantyService.GetCountryStates()
			.then(function(data){
				$scope.countrystates = data;
			});

		$scope.submitWarranty = function(warranty){
			if(warranty.date === null){
				$scope.dateMessage = "This field cannot be empty.";
				return;
			}
			warranty.date = new Date(warranty.date);
			console.log(warranty)

			WarrantyService.SubmitWarranty(warranty)
				.then(function(data){
					$scope.warranty = {};
					$scope.dateMessage = "";
					$scope.message = "Request sent."
				});
		}

		$scope.matchPart = function(warranty){
			$scope.partConfirm = false;
			WarrantyService.GetPart(warranty.partNumber)
				.then(function(data){
					if (data.status > 0){
						$scope.warranty.partNumber = data.id;
						$scope.partConfirm = true;
					}else{
						WarrantyService.GetOldPart(warranty.partNumber)
							.then(function(data){
								if (data.status > 0){
									$scope.warranty.oldPartNumber = data.oldPartNumber;
									$scope.partConfirm = true;
								}
							});
					}
				});
		}
		
	}]);
});