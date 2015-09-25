'use strict';

angular.module('ariesautomotive').controller('WarrantiesController',  ['$scope', 'WarrantyService','GeographyService','PartService', '$rootScope', function($scope, WarrantyService, GeographyService, PartService, $rootScope){
	$scope.message = "Click this button:";
	$scope.partConfirm = false;
	$scope.warranty = {};
	$scope.warranty.contact = {};

	$scope.states = {};

	$rootScope.pageTitle = "ARIES Automotive | Warranty Registration";
  $rootScope.pageDesc = "Register and submit an ARIES product warranty using your warranty card and proof of purchase. ARIES warranty submission can be online or through fax or email.";
  $rootScope.pageKywds = "aries, warranty, automotive";

	$scope.updateStates = function(){
		$scope.states = this.form.country.states;
		$scope.warranty.contact.country = this.form.country.country;
	};

	$scope.updateState = function(){
		$scope.warranty.contact.state = this.form.state.state;
	};

	GeographyService.GetCountryStates().then(function(countries){
		$scope.countrystates = countries;
	});

	$scope.submitWarranty = function(warranty){
		if(warranty.date === null){
			$scope.dateMessage = "This field cannot be empty.";
			return;
		}
		warranty.date = new Date(warranty.date);

		WarrantyService.SubmitWarranty(warranty).then(function(data){
			$scope.warranty = {};
			$scope.dateMessage = "";
			$scope.message = "Request sent.";
		});
	};

	$scope.matchPart = function(warranty){
		$scope.partConfirm = false;

		PartService.GetPart(warranty.partNumber).then(function(part){
			if(part.status > 0){
				$scope.warranty.partNumber = part.id;
				$scope.partConfirm = true;
			} else{
				PartService.GetOldPart(warranty.partNumber).then(function(part){
					if(part.status > 0){
						$scope.warranty.oldPartNumber = part.oldPartNumber;
						$scope.partConfirm = true;
					}
				});
			}
		});
	};
}]);
