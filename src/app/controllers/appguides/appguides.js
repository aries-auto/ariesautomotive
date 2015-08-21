'use strict';

angular.module('ariesautomotive').controller('AppGuidesController', ['$scope', 'ApplicationGuideService', '$rootScope', function($scope, ApplicationGuideService, $rootScope){
	$scope.applicationGuide = {};
	$scope.categories = [];
	$scope.applicationGuides = {};

	$rootScope.pageTitle = "ARIES Automotive | Application Guide | Part Lookup Information";
	$rootScope.pageDesc = "Each ARIES app guide is category-specific and broken down by vehicle make, model, year and style to help you find the right ARIES part for your vehicle.";
	$rootScope.pageKywds = "aries, automotive, application guide";

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
