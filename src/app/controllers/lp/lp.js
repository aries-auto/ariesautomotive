'use strict';

angular.module('ariesautomotive').controller('LPController', ['$rootScope','$scope', 'LandingPageService', '$stateParams', '$sce', function($rootScope, $scope, LandingPageService, $stateParams, $sce){
	$scope.page = {};
	// Default page title
	$rootScope.pageTitle = "ARIES Automotive";
	$rootScope.pageKywds = "aries, automotive";
	
	//Awful hack - merged DBs threw certain ID's off by 4 - URLs have been published
	if ($stateParams.id > 23 && $stateParams.id < 27){
		$stateParams.id++;
		$stateParams.id++;
		$stateParams.id++;
		$stateParams.id++;
	}

	if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
		$scope.page = LandingPageService.GetLandingPage($stateParams.id).then(function(data){
			$scope.page = data;
			$rootScope.pageTitle = "ARIES Automotive | " + $scope.page.Name;

		});
	}

	$scope.renderHTML = function(content){
		return $sce.trustAsHtml(content);
	};
}]);
