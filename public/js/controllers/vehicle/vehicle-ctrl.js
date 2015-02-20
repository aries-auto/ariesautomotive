/**
 * Vehicle controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('VehicleController',  ['$scope', 'LookupService','PartService', '$location','$anchorScroll', '$stateParams', function($scope, LookupService, PartService, $location, $anchorScroll, $stateParams){
		
		$scope.vehicle = LookupService.get();
		$scope.years = [];
		$scope.makes = [];
		$scope.submodels = [];
		$scope.configurations = [];
		$scope.qualified = false;
		$scope.pagination = {
			page: 1,
			count: 12
		};
		if($location.search().page !== undefined && $location.search().page !== null){
			$scope.pagination.page = parseInt($location.search().page,10);
		}
		if($location.search().count !== undefined && $location.search().count !== null ){
			$scope.pagination.count = parseInt($location.search().count,10);
		}


		var i;
		
		if($scope.vehicle === null && $stateParams !== {}){
			$scope.vehicle = {
				base:{
					year:0,
					make:'',
					model:''
				},
				submodel:'',
				configurations: []
			};
			if($stateParams.year !== undefined && $stateParams.year !== null){
				$scope.vehicle.base.year = parseInt($stateParams.year, 0);
				if($stateParams.make !== undefined && $stateParams.make !== null && $stateParams.make !== ''){
					$scope.vehicle.base.make = $stateParams.make;
					if($stateParams.model !== undefined && $stateParams.model !== null && $stateParams.model !== ''){
						$scope.vehicle.base.model = $stateParams.model;
						if($stateParams.submodel !== undefined && $stateParams.submodel !== null && $stateParams.submodel !== ''){
							$scope.vehicle.submodel = $stateParams.submodel;
						}
					}
				}
			}

			LookupService.query($scope.vehicle, $scope.pagination.page, $scope.pagination.count).then(function(data){
				if(data.available_years !== undefined && data.available_years !== null && data.available_years.length > 0){
					$scope.years = data.available_years;
				}
				if(data.available_makes !== undefined && data.available_makes !== null && data.available_makes.length > 0){
					$scope.makes = data.available_makes;
				}
				if(data.available_models !== undefined && data.available_models !== null && data.available_models.length > 0){
					$scope.models = data.available_models;
				}
				if(data.available_submodels !== undefined && data.available_submodels !== null && data.available_submodels.length > 0){
					$scope.submodels = data.available_submodels;
					$scope.vehicle.configurations = [];
				}
				if(data.available_configurations !== undefined && data.available_configurations !== null && data.available_configurations.length > 0){
					$scope.configurations = data.available_configurations;
					var confs = [];
					if($stateParams.configs !== undefined && $stateParams.configs !== null && $stateParams.configs !== ''){
						confs = $stateParams.configs.split('/');
					}
					angular.forEach(data.available_configurations, function(conf, i){
						
						for (i = 0; i < confs.length; i++) {
							var c = confs[i];
							if (conf.value === c){
								$scope.vehicle.configurations.push({
									key: conf.key, 
									value: conf.value
								});
							}
						}
					});
				}else{
					$scope.parts = data.parts;
					$scope.pagination = data.pagination;
				}
			},function(err){
				$scope.err = err;
			});
		}else {
			if ($scope.vehicle !== null){
				$scope.qualified = true;
			}

			LookupService.query($scope.vehicle, $scope.pagination.page, $scope.pagination.count).then(function(data){
				$scope.parts = data.parts;
				$scope.pagination = data.pagination;
				if(data.available_years !== undefined && data.available_years !== null && data.available_years.length > 0){
					$scope.years = data.available_years;
				}
				if(data.available_makes !== undefined && data.available_makes !== null && data.available_makes.length > 0){
					$scope.makes = data.available_makes;
				}
				if(data.available_models !== undefined && data.available_models !== null && data.available_models.length > 0){
					$scope.models = data.available_models;
				}
				if(data.available_submodels !== undefined && data.available_submodels !== null && data.available_submodels.length > 0){
					$scope.submodels = data.available_submodels;
					$scope.vehicle.configurations = [];
				}
				if(data.available_configurations !== undefined && data.available_configurations !== null && data.available_configurations.length > 0){
					$scope.configurations = data.available_configurations;
					angular.forEach(data.available_configurations, function(conf, i){
						$scope.vehicle.configurations[i] = {
							key: conf.type
						};
					});
				}
			},function(err){
				$scope.err = err;
			});
		}

		$scope.scrollTo = function(elementId){
			$location.hash(elementId);
			$anchorScroll();
		};
		$scope.clear = function(){
			$scope.vehicle = {};
			$scope.vehicle.base = {};
			$scope.vehicle.base.year = 0;
			$scope.parts = null;
		};
		$scope.getParts = function(){
			LookupService.query($scope.vehicle, $scope.pagination.page, $scope.pagination.count).then(function(data){
				$scope.parts = data.parts;
				$scope.pagination = data.pagination;
			},function(err){
				$scope.err = err;
			});
		};
		$scope.loadMore = function(){
			$scope.pagination.page++;
			LookupService.query($scope.vehicle, $scope.pagination.page, $scope.pagination.returned_count).then(function(data){
				$scope.parts = $scope.parts.concat(data.parts);
				$scope.pagination = data.pagination;
			},function(err){
				$scope.err = err;
			});
		};
		$scope.vehicleLink = function(){
			var str = '/vehicle';
			if($scope.vehicle === undefined || $scope.vehicle === null || $scope.vehicle.base === undefined || $scope.vehicle.base === null){
				return str;
			}
			if($scope.vehicle.base.year === undefined || $scope.vehicle.base.year === null || $scope.vehicle.base.year === 0){
				return str;
			}
			str += '/' + $scope.vehicle.base.year;
			if($scope.vehicle.base.make === undefined || $scope.vehicle.base.make === null || $scope.vehicle.base.make === ''){
				return str;
			}
			str += '/' + $scope.vehicle.base.make;
			if($scope.vehicle.base.model === undefined || $scope.vehicle.base.model === null || $scope.vehicle.base.model === ''){
				return str;
			}
			str += '/' + $scope.vehicle.base.model;
			if($scope.vehicle.submodel === undefined || $scope.vehicle.submodel === null || $scope.vehicle.submodel === ''){
				return str;
			}
			str += '/' + $scope.vehicle.submodel;
			if($scope.vehicle.configurations === undefined || $scope.vehicle.configurations === null || $scope.vehicle.configurations.length === 0){
				return str;
			}
			for (var j = 0; j < $scope.vehicle.configurations.length; j++) {
				str += '/' + $scope.vehicle.configurations[j].key;
			}
			return str;
		};
		$scope.$on('vehicleChange',function(event,x){
			$scope.vehicle = x;
			$scope.getParts();
		});
		
	}]);
});