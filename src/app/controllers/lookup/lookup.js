/**
 * Lookup controller definition
 */
'use strict';

angular.module('ariesautomotive').controller('LookupController', ['$scope', '$window', '$timeout', 'LookupService', '$location', '$rootScope', 'localStorageService', function($scope, $window, $timeout, LookupService, $location, $rootScope, localStorageService) {
	$scope.title = 'Your Vehicle';
	$scope.valid_vehicle = true;
	$scope.years = [];
	$scope.makes = [];
	$scope.models = [];
	$scope.styles = [];
	$scope.collections = [];
	$scope.vehicle_string = '';
	$scope.path = '';
	$scope.vehicle_string = LookupService.toString();

	$scope.vehicle = LookupService.getVehicle('vehicle');
	if($scope.vehicle === null || !LookupService.validateBaseVehicle($scope.vehicle)) {
		$scope.valid_vehicle = false;
		LookupService.clear();
		$scope.vehicle = {
			year: '',
			make: '',
			model: '',
			style: '',
			collection: ''
		};
	} else {
		$scope.vehicle_string = LookupService.toString();
	}

	if ($scope.vehicle_string !== null && $scope.vehicle_string !== '') {
		$scope.path = '/vehicle/' + $scope.vehicle.year + '/' + $scope.vehicle.make + '/' + $scope.vehicle.model;
	}

	$scope.clearVehicle = function() {
	if (($scope.makes === null) && ($scope.models === null) && (!$scope.validVehicle)) {
		return;
	}
	LookupService.clear();
	$scope.vehicle = {};
	$scope.years = null;
	$scope.makes = null;
	$scope.models = null;
	$scope.styles = null;
	$scope.parts = null;
	$scope.validVehicle = false;

	if ($location.path().match('vehicle')) {
		$location.path('/');
	}
};

	$scope.submitVehicle = function() {
		var l = $location.path();
		var path = '/vehicle/' + $scope.vehicle.year + '/' + $scope.vehicle.make + '/' + $scope.vehicle.model;
		if ($scope.vehicle.style !== '') {
			path += '/' + $scope.vehicle.style;
		}
		if (l !== path) {
			$scope.path = path;
			$location.path(path);
		}
		$scope.valid_vehicle = true;
		LookupService.setVehicle($scope.vehicle);
	};
	$scope.generateVehicleString = function() {
		var str = '';
		if ($scope.vehicle.year === undefined || $scope.vehicle.make === undefined || $scope.vehicle.model === undefined) {
			$scope.vehicle_string = str;
			return;
		}
		if ($scope.vehicle.year === null || $scope.vehicle.make === null || $scope.vehicle.model === null) {
			$scope.vehicle_string = str;
			return;
		}

		str = $scope.vehicle.year + ' ' + $scope.vehicle.make.trim() + ' ' + $scope.vehicle.model.trim();

		if ($scope.vehicle.style !== undefined && $scope.vehicle.style !== '') {
			str += ' ' + $scope.vehicle.style.trim();
		}

		$scope.vehicle_string = str;
		$rootScope.full_vehicle = str;
	};

	$scope.clearVehicle = function() {
		LookupService.clear();
		$scope.vehicle = {};
		$scope.valid_vehicle = false;
		$timeout(function() {
			$scope.vehicle = {
				year: 0,
				make: '',
				model: '',
				style: '',
				collection: '',
			};
			LookupService.query($scope.vehicle).then(function(data) {
				if (data.available_years !== undefined && data.available_years !== null && data.available_years.length > 0) {
					$scope.years = data.available_years;
				}
				if (data.available_makes !== undefined && data.available_makes !== null && data.available_makes.length > 0) {
					$scope.makes = data.available_makes;
				}
				if (data.available_models !== undefined && data.available_models !== null && data.available_models.length > 0) {
					$scope.models = data.available_models;
				}
				if (data.available_submodels !== undefined && data.available_submodels !== null && data.available_submodels.length > 0) {
					$scope.submodels = data.available_submodels;
					$scope.vehicle.configurations = [];
				}
				if (data.available_configurations !== undefined && data.available_configurations !== null && data.available_configurations.length > 0) {
					$scope.configurations = data.available_configurations;
					angular.forEach(data.available_configurations, function(conf, i) {
						$scope.vehicle.configurations[i] = {
							key: conf.type
						};
					});
				}
				$scope.generateVehicleString();
			});
		});
	};

	$scope.resetYear = function() {
		$scope.vehicle.year = '';
		$scope.vehicle.make = '';
		$scope.vehicle.model = '';
		$scope.vehicle.style = '';
	};

	$scope.resetMake = function() {
		$scope.vehicle.make = '';
		$scope.vehicle.model = '';
		$scope.vehicle.style = '';
	};

	$scope.resetModel = function() {
		$scope.vehicle.model = '';
		$scope.vehicle.style = '';
	};

	$scope.$watchCollection('vehicle', function(n, o) {
		$scope.processing = true;
		var vehicle = n;
		if (n === undefined || n === null || n === o) {
			vehicle = {};
		}

		LookupService.query($scope.vehicle).then(function(resp) {
			if (resp.available_years) {
				$scope.processing = true;
				$scope.years = resp.available_years;
				$scope.makes = null;
				$scope.models = null;
				$scope.styles = null;
				$scope.processing = false;
				return;
			}
			if (resp.available_makes) {
				$scope.processing = true;
				$scope.makes = resp.available_makes;
				$scope.models = null;
				$scope.styles = null;
				$scope.processing = false;
				return;
			}
			if (resp.available_models) {
				$scope.processing = true;
				$scope.models = resp.available_models;
				$scope.styles = null;
				$scope.processing = false;
				return;
			}
			if (resp.available_styles) {
				$scope.styles = resp.vailable_styles;
				$scope.parts = null;
			}
			if (resp.parts) {
				$scope.parts = resp.parts;
				$scope.processing = false;
				return;
			}
			$scope.processing = false;
		});

	});
}]);
