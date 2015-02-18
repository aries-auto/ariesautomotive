/**
 * Vehicle controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('VehicleController',  ['$scope', 'LookupService','PartService', '$location','$anchorScroll', '$stateParams', function($scope, LookupService, PartService, $location, $anchorScroll, $stateParams){
		console.log('vehicle loading');
		$scope.vehicle = LookupService.get();
		$scope.years = [];
		$scope.makes = [];
		$scope.submodels = [];
		$scope.configurations = [];
		

		if($scope.vehicle === null && $stateParams != {}){
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
				console.log($scope.vehicle);
			}
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

		$scope.$on('vehicleChange',function(event,x){
			$scope.vehicle = x;
			$scope.getParts();
		});

		$scope.getParts = function(){
			LookupService.query($scope.vehicle).then(function(data){
				$scope.parts = data.parts;
			},function(err){
				$scope.err = err;
			});
		};
		
	}]);
});