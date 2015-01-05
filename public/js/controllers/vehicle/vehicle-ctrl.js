/**
 * Vehicle controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('VehicleController',  ['$scope', 'LookupService','PartService', '$location','$anchorScroll', function($scope, LookupService, PartService, $location, $anchorScroll){
		$scope.vehicle = LookupService.get();

		
		$scope.parts = LookupService.query($scope.vehicle)
			.then(function(data){
				$scope.parts = data.parts;
			},function(err){
				$scope.err = err;
			});

		$scope.scrollTo = function(elementId){
			$location.hash(elementId);
			$anchorScroll();
		};
	}]);
});