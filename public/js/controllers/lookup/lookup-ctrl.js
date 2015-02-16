/**
 * Lookup controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('LookupController', ['$scope','$window', 'LookupService',  '$location', function($scope, $window, LookupService,  $location){
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
				head.querySelectorAll('.glyphicon')[0].className = head.querySelectorAll('.glyphicon')[0].className.replace(/(?:^|\s)glyphicon-chevron-up(?!\S)/g, ' glyphicon-chevron-down');
				look.className = look.className.replace(/(?:^|\s)show(?!\S)/g, '');
				return;
			}
			
			console.log(head);
			head.querySelectorAll('.glyphicon')[0].className = head.querySelectorAll('.glyphicon')[0].className.replace(/(?:^|\s)glyphicon-chevron-down(?!\S)/g, ' glyphicon-chevron-up');
			look.className += ' show';
			return;
		};
		$scope.submitVehicle = function(){
			var l = $location.path();
			if (l !== "/vehicle"){
				$location.path("/vehicle");
			}else{
				LookupService.set($scope.vehicle);
			}
		};


		$scope.$watch('vehicle.base.year',function(n, o){
			$scope.vehicle.base.year = parseInt($scope.vehicle.base.year, 10);
			$scope.vehicle.base.make = '';
			$scope.vehicle.base.model = '';
			$scope.vehicle.submodel = '';
			$scope.vehicle.configurations = [];
			$scope.makes = [];
			$scope.models = [];
			$scope.submodels = [];
			$scope.configurations = [];
			if(n !== o && n === 0){
				$scope.updateVehicle();
			}
			LookupService.set($scope.vehicle);
		});
		$scope.$watch('vehicle.base.make',function(n, o){
			$scope.vehicle.base.model = '';
			$scope.vehicle.submodel = '';
			$scope.vehicle.configurations = [];
			$scope.models = [];
			$scope.submodels = [];
			$scope.configurations = [];
			if(n !== o && n === ''){
				$scope.updateVehicle();
			}
		});
		$scope.$watch('vehicle.base.model',function(n, o){
			$scope.vehicle.submodel = '';
			$scope.vehicle.configurations = [];
			$scope.submodels = [];
			$scope.configurations = [];
			if(n !== o && n === ''){
				$scope.updateVehicle();
			}
		});
		$scope.$watch('vehicle.submodel',function(n, o){
			$scope.vehicle.configurations = [];
			$scope.configurations = [];
			if(n !== o && n === ''){
				$scope.updateVehicle();
			}
		});
		$scope.$watch('vehicle.configurations',function(n, o){
			$scope.updateVehicle();
		});
	}]);
});