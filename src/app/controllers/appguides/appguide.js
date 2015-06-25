'use strict';

angular.module('ariesautomotive').controller('AppGuideController', ['$scope', '$stateParams', 'ApplicationGuideService', function($scope, $stateParams, ApplicationGuideService){
	$scope.collection = $stateParams.collection || '';
	$scope.applications = [];
	var page = 0;

	var getMore = function(page){
		ApplicationGuideService.getApplications($scope.collection, page).then(function(data){
			if(data.length > 0){
				$scope.applications = $scope.applications.concat(data);
				page = page + 1;
				getMore(page);
			}
		});
	};
	getMore(0);

}]);
