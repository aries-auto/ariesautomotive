'use strict';

angular.module('ariesautomotive').controller('AppGuidesController', ['$scope', 'LookupService', function($scope, LookupService){
	$scope.collections = [];

	LookupService.collections().then(function(data){
		$scope.collections = data;
	});

}]);
