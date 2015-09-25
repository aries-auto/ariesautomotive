'use strict';

angular.module('ariesautomotive').controller('LPController', ['$scope', 'LandingPageService', '$stateParams', '$sce', function($scope, LandingPageService, $stateParams, $sce){
	$scope.page = {};

	if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
		$scope.page = LandingPageService.GetLandingPage($stateParams.id).then(function(data){
			$scope.page = data;
		});
	}

	$scope.renderHTML = function(content){
		return $sce.trustAsHtml(content);
	};
}]);
