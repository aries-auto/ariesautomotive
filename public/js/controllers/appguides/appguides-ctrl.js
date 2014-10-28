/**
 * AppGuides controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('AppGuidesController', ['$scope', 'ApplicationGuideService', function($scope, ApplicationGuideService){
		$scope.applicationGuide;
		$scope.categories = [];
		$scope.applicationGuides;

		$scope.applicationGuides = ApplicationGuideService.GetApplicationGuidesByWebsite(3)//3 is Aries site...
			.then(function(data){
				$scope.applicationGuides = data;

				//get unique cat ids
				angular.forEach($scope.applicationGuides,function(v,k){
					v.category.title  = (v.category.title == '')?'General Aries Applicatons':v.category.title;//set blank titles
					if ($scope.categories.indexOf(v.category.title) == -1){
						$scope.categories.push(v.category.title);
					}
					
				});
			});
		
	}]);
});