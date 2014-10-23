/**
 * Part controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('PartController', ['$scope', '$location', 'PartService', function(scope, location, PartService){
		var path = location.absUrl();
		var parts = path.split('/');
		var partID = parts.length - 1 > 0 ? parseInt(parts[parts.length - 1]) : 0;
		
		PartService.GetPart(partID,function(part, err){
			if(err){
				console.log(err);
				return;
			}
			scope.part = part;
		});

		PartService.GetLatest(function(latestParts, err){
			if(err){
				console.log(err);
				return;
			}
			scope.latestParts = latestParts;
		});
	}]);
});