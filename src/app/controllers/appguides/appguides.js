'use strict';

angular.module('ariesautomotive').controller('AppGuidesController', ['$scope', 'ApplicationGuideService', '$rootScope', 'TitleService', function($scope, ApplicationGuideService, $rootScope, TitleService){
	$scope.applicationGuide = {};
	$scope.categories = [];
	$scope.applicationGuides = {};

	var titleText = "App Guides | Application Guides for Aries Automotive accessories.";
	$rootScope.titleservice = TitleService;
	$rootScope.titleservice.set(titleText);

	//3 is the Aries site...
	$scope.applicationGuides = ApplicationGuideService.GetApplicationGuidesByWebsite(3).then(function(data){
		$scope.applicationGuides = data;

		//get unique cat ids
		angular.forEach($scope.applicationGuides, function(v,k){
			v.category.title = (v.category.title === '') ? 'General Aries Applications' : v.category.title;
			if($scope.categories.indexOf(v.category.title) === -1){
				$scope.categories.push(v.category.title);
			}
		});
	});
}]);
