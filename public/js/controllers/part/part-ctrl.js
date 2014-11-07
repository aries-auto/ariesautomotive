/**
 * Part controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('PartController', ['$scope', 'PartService', '$stateParams','$sce', function($scope, PartService, $stateParams, $sce){
		$scope.part = {};
		$scope.featuredProducts = [];
		if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
			PartService.GetPart($stateParams.id).then(function(part){
				$scope.part = part;
			});
		}

		PartService.GetFeatured().then(function(featured){
			$scope.featuredProducts = featured;
		});

		$scope.renderHTML = function(content){
			return $sce.trustAsHtml(content);
		};

		$scope.getIframeSrc = function(videoID){
			return $sce.trustAsResourceUrl('//www.youtube.com/embed/' + videoID);
		};
	}]);
});