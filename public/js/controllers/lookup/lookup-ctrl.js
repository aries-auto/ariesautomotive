/**
 * Lookup controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('LookupController', ['$scope','$window', '$timeout', 'LookupService',  '$location', function($scope, $window, $timeout, LookupService, $location){

		$scope.title ='Your Vehicle';
		$scope.vehicle = {
			base:{
				year: 0,
				make: '',
				model: ''
			},
			submodel: '',
			configurations: []
		};
		$scope.vehicle_string = '';
		$scope.valid_vehicle = false;
		$scope.years = [];
		$scope.makes = [];
		$scope.submodels = [];
		$scope.configurations = [];

		$scope.updateVehicle = function(e){
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
				$scope.generateVehicleString();
			});
		};
		$scope.showLookup = function(){
			var els = document.getElementsByClassName('lookup');
			var heads = document.getElementsByClassName('lookup-heading');
			if(els.length === 0 || heads.length === 0){
				return;
			}
			var look = els[0];
			var head = heads[0];
			if(els[0].className.indexOf('show') !== -1){ // reset
				head.querySelectorAll('.expansion-arrow')[0].className = head.querySelectorAll('.expansion-arrow')[0].className.replace(/(?:^|\s)up(?!\S)/g, ' down');
				look.className = look.className.replace(/(?:^|\s)show(?!\S)/g, '');
				return;
			}
			
			
			head.querySelectorAll('.expansion-arrow')[0].className = head.querySelectorAll('.expansion-arrow')[0].className.replace(/(?:^|\s)down(?!\S)/g, '');
			head.querySelectorAll('.expansion-arrow')[0].className += ' up';
			look.className += ' show';
			return;
		};
		$scope.submitVehicle = function(){
			var l = $location.path();
			LookupService.set($scope.vehicle);
			if (l !== "/vehicle"){
				$location.path("/vehicle");
			}
			$scope.valid_vehicle = true;
		};
		$scope.generateVehicleString = function(){
			var str = '';
			if($scope.vehicle.base === undefined || $scope.vehicle.base.year === undefined || $scope.vehicle.base.make === undefined || $scope.vehicle.base.model === undefined){
				$scope.vehicle_string = str;
				return;
			}
			if($scope.vehicle.base === null || $scope.vehicle.base.year === null || $scope.vehicle.base.make === null || $scope.vehicle.base.model === null){
				$scope.vehicle_string = str;
				return;
			}
			str = $scope.vehicle.base.year + ' ' + $scope.vehicle.base.make.trim() + ' ' + $scope.vehicle.base.model.trim();
			
			if($scope.vehicle.submodel !== undefined && $scope.vehicle.submodel !== ''){
				str += ' ' + $scope.vehicle.submodel.trim();
			}
			if($scope.vehicle.configurations !== undefined && $scope.vehicle.configurations.length > 0){
				for (var i = $scope.vehicle.configurations.length - 1; i >= 0; i--) {
					var conf = $scope.vehicle.configurations[i];
					if(conf.value !== undefined && conf.value !== ''){
						str += ' ' + conf.value.trim();
					}
				}
			}

			$scope.vehicle_string = str;
		};
		$scope.clearVehicle = function(){
			if(!LookupService.delete()){
				return;
			}
			$scope.valid_vehicle = false;
			$timeout(function(){
				$scope.showLookup();
				$scope.vehicle = {
					base:{
						year: 0,
						make: '',
						model: ''
					},
					submodel: '',
					configurations: []
				};
			});
		};

		var tmpVehicle = LookupService.get();
		if(tmpVehicle !== undefined && tmpVehicle !== null && tmpVehicle.base !== undefined && tmpVehicle.base !== null){
			$scope.vehicle = tmpVehicle;
			LookupService.query($scope.vehicle).then(function(data){
				if(data.available_years !== undefined && data.available_years !== null && data.available_years.length > 0){
					$scope.valid_vehicle = false;
				}else if(data.available_makes !== undefined && data.available_makes !== null && data.available_makes.length > 0){
					$scope.valid_vehicle = false;
				}else if(data.available_models !== undefined && data.available_models !== null && data.available_models.length > 0){
					$scope.valid_vehicle = false;
				}else if(data.available_submodels !== undefined && data.available_submodels !== null && data.available_submodels.length > 0){
					$scope.valid_vehicle = false;
				}else if(data.available_configurations !== undefined && data.available_configurations !== null && data.available_configurations.length > 0){
					$scope.valid_vehicle = false;
				}else{
					$scope.valid_vehicle = true;
					$scope.vehicle = data.vehicle;
				}
				$scope.generateVehicleString();
				return;
			});
		}else{
			$scope.updateVehicle();
		}

		$scope.$watch('vehicle.base.year',function(n, o){
			if(n !== o && n > 0){
				$scope.vehicle.base.year = parseInt($scope.vehicle.base.year, 10);
				$scope.vehicle.base.make = '';
				$scope.vehicle.base.model = '';
				$scope.vehicle.submodel = '';
				$scope.vehicle.configurations = [];
				$scope.makes = [];
				$scope.models = [];
				$scope.submodels = [];
				$scope.configurations = [];
				$scope.updateVehicle();
			}
		});
		$scope.$watch('vehicle.base.make',function(n, o){
			if(n !== o && n !== ''){
				$scope.vehicle.base.model = '';
				$scope.vehicle.submodel = '';
				$scope.vehicle.configurations = [];
				$scope.models = [];
				$scope.submodels = [];
				$scope.configurations = [];
				$scope.updateVehicle();
			}
		});
		$scope.$watch('vehicle.base.model',function(n, o){
			if(n !== o && n !== ''){
				$scope.vehicle.submodel = '';
				$scope.vehicle.configurations = [];
				$scope.submodels = [];
				$scope.configurations = [];
				$scope.updateVehicle();
			}
		});
		$scope.$watch('vehicle.submodel',function(n, o){
			if(n !== o && n !== ''){
				$scope.vehicle.configurations = [];
				$scope.configurations = [];
				$scope.updateVehicle();
			}
		});
		$scope.$watch('vehicle.configurations',function(n, o){
			if(n.length !== o.length){
				$scope.updateVehicle();
			}
		});
	}]);
});