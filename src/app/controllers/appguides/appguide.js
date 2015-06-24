'use strict';

angular.module('ariesautomotive').controller('AppGuideController', ['$scope', '$stateParams', 'ApplicationGuideService', function($scope, $stateParams, ApplicationGuideService){
	$scope.collection = $stateParams.collection || '';
	$scope.applications = [];

	ApplicationGuideService.getApplications($scope.collection).then(function(data){
		$scope.applications = data;
	});
}]);
