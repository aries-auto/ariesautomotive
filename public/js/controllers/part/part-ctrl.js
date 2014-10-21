/**
 * Part controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('PartController', ['$scope', 'PartService', function($scope, PartService){
		PartService.GetLatest(function(latestParts, err){
			if(err){
				console.log(err);
				return;
			}
			$scope.latestParts = latestParts;
		});
	}]);
});