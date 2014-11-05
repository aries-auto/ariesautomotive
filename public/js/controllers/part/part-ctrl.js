/**
 * Part controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('PartController', ['$scope', 'PartService', '$stateParams','$sce', function($scope, PartService, $stateParams, $sce){
		$scope.part = {};
		$scope.latestParts = [];
		$scope.featuredProducts = [];
		if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
			PartService.GetPart($stateParams.id,function(part, err){
				if(!err){
					$scope.part = part;
				}
			});
		}

		PartService.GetLatest(function(latestParts, err){
			if(!err){
				$scope.latestParts = latestParts;
			}
		});

		PartService.GetFeatured(function(featured, err){
			if(err){
				return;
			}
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