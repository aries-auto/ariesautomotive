'use strict';

angular.module('ariesautomotive').controller('VehicleController',  ['$scope', 'LookupService', 'PartService', 'CategoryService', '$location','$anchorScroll', '$stateParams', '$rootScope', 'TitleService', function($scope, LookupService, PartService, CategoryService, $location, $anchorScroll, $stateParams, $rootScope, TitleService){

	$scope.vehicle = {};
	$scope.collections = [];
	$scope.years = [];
	$scope.makes = [];
	$scope.styles = [];
	$scope.inquiry = {};
	$scope.inquiry_success = false;
	$scope.qualified = false;

	if($rootScope.full_vehicle === null || $rootScope.full_vehicle === undefined || $rootScope.full_vehicle === '') {
		var titleText = "Vehicle Search - ARIES Automotive Products."
	} else {
		var titleText = "Vehicle Search - ARIES Automotive Products for " + $rootScope.full_vehicle;
	}

	$rootScope.titleservice = TitleService;
	$rootScope.titleservice.set(titleText);

	$scope.scrollTo = function(elementId){
		$location.hash(elementId);
		$anchorScroll();
	};
	$scope.clear = function(){
		$scope.vehicle = {};
		$scope.parts = null;
	};
	$scope.getParts = function(){
		LookupService.query($scope.vehicle).then(function(data){
			$scope.parts = data.parts;
		},function(err){
			$scope.err = err;
		});
	};
	$scope.vehicleLink = function(val){
		val = encodeURIComponent(val);
		var str = '/vehicle';
		if($scope.vehicle === undefined || $scope.vehicle === null || $scope.vehicle === undefined || $scope.vehicle === null){
			return str + '/'+val;
		}
		if($scope.vehicle.collection === undefined || $scope.vehicle.collection === null || $scope.vehicle.collection === ''){
			return str + '/'+val;
		}
		str += '/' + encodeURIComponent($scope.vehicle.collection);
		if($scope.vehicle.year === undefined || $scope.vehicle.year === null || $scope.vehicle.year === ''){
			return str + '/'+val;
		}
		str += '/' + $scope.vehicle.year;
		if($scope.vehicle.make === undefined || $scope.vehicle.make === null || $scope.vehicle.make === ''){
			return str + '/'+val;
		}
		str += '/' + encodeURIComponent($scope.vehicle.make);
		if($scope.vehicle.model === undefined || $scope.vehicle.model === null || $scope.vehicle.model === ''){
			return str + '/'+val;
		}
		str += '/' + encodeURI($scope.vehicle.model);
		if($scope.vehicle.style === undefined || $scope.vehicle.style === null || $scope.vehicle.style === ''){
			return str + '/'+val;
		}
		str += '/' + encodeURIComponent($scope.vehicle.style);

		return str;
	};
	$scope.generateVehicleString = function(){
		var str = '';
		if($scope.vehicle === undefined || $scope.vehicle.year === undefined || $scope.vehicle.make === undefined || $scope.vehicle.model === undefined){
			return str;
		}
		if($scope.vehicle === null || $scope.vehicle.year === null || $scope.vehicle.make === null || $scope.vehicle.model === null){
			return str;
		}

		str = $scope.vehicle.year + ' ' + $scope.vehicle.make.trim() + ' ' + $scope.vehicle.model.trim();

		if($scope.vehicle.style !== undefined && $scope.vehicle.style !== ''){
			str += ' ' + $scope.vehicle.style.trim();
		}

		return str.replace(/\w\S*/g, function(str){return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();}).toUpperCase();
	};
	$scope.submitInquiry = function(){
		$scope.inquiry.vehicle = JSON.stringify($scope.vehicle);
		LookupService.inquire($scope.inquiry).then(function(){
			$scope.inquiry_success = true;
			$scope.inquiry = {};
		},function(err){
			$scope.err = err;
		});
	};
	$scope.$on('vehicleChange',function(event,x){
		$scope.vehicle = x;
		$scope.getParts();
	});

	var i;
	if($scope.vehicle.year === undefined && $stateParams !== {}){
		$scope.vehicle = {
			collection:'',
			year:'',
			make:'',
			model:''
		};
		if($stateParams.collection !== undefined && $stateParams.collection !== null){
			$scope.vehicle.collection = $stateParams.collection;
			if($stateParams.year !== undefined && $stateParams.year !== null){
				$scope.vehicle.year = $stateParams.year;
				if($stateParams.make !== undefined && $stateParams.make !== null && $stateParams.make !== ''){
					$scope.vehicle.make = $stateParams.make;
					if($stateParams.model !== undefined && $stateParams.model !== null && $stateParams.model !== ''){
						$scope.vehicle.model = $stateParams.model;
						if($stateParams.style !== undefined && $stateParams.style !== null && $stateParams.style !== ''){
							$scope.vehicle.style = $stateParams.style;
						}
					}
				}
			}
		}

		if($scope.vehicle.collection !== ''){
			LookupService.query($scope.vehicle).then(function(data){
				if(data.available_years !== undefined && data.available_years !== null && data.available_years.length > 0){
					$scope.years = data.available_years;
				}
				if(data.available_makes !== undefined && data.available_makes !== null && data.available_makes.length > 0){
					$scope.makes = data.available_makes;
				}
				if(data.available_models !== undefined && data.available_models !== null && data.available_models.length > 0){
					$scope.models = data.available_models;
				}
				if(data.available_styles !== undefined && data.available_styles !== null && data.available_styles.length > 0){
					$scope.styles = data.available_styles;
				}
				if(data.parts !== undefined && data.parts !== null){
					$scope.parts = data.parts;
				}
			},function(err){
				$scope.err = err;
			});
		}else{
			LookupService.collections().then(function(data){
				$scope.collections = data;
			},function(err){
				$scope.err = err;
			});
		}
	} else {
		if ($scope.vehicle !== null){
			$scope.qualified = true;
		}

		LookupService.query($scope.vehicle).then(function(data){
			$scope.parts = data.parts;
			if(data.available_years !== undefined && data.available_years !== null && data.available_years.length > 0){
				$scope.years = data.available_years;
			}
			if(data.available_makes !== undefined && data.available_makes !== null && data.available_makes.length > 0){
				$scope.makes = data.available_makes;
			}
			if(data.available_models !== undefined && data.available_models !== null && data.available_models.length > 0){
				$scope.models = data.available_models;
			}
			if(data.available_styles !== undefined && data.available_styles !== null && data.available_styles.length > 0){
				$scope.styles = data.available_styles;
			}
		},function(err){
			$scope.err = err;
		});
	}

	CategoryService.GetParents().then(function(data){
		$scope.categories = [];
		for (var i = 0; i < data.length; i++) {
			var cat = data[i];
			if(cat.sub_categories !== undefined && cat.sub_categories !== null && cat.sub_categories.length > 0){
				for (var j = 0; j < cat.sub_categories.length; j++) {
					var sub = cat.sub_categories[j];
					$scope.categories.push(sub);
				}
			}else{
				$scope.categories.push(cat);
			}
		}
	});
}]);
