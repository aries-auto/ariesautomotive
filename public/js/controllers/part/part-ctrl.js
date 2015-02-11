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
		$scope.getCategoryBrief = function(){
			if ($scope.part.content === undefined){
				return '';
			}
			for (var i = $scope.part.content.length - 1; i >= 0; i--) {
				var con = $scope.part.content[i];
				if(con.contentType.Type === 'CategoryBrief'){
					return con.text;
				}
			}
			return '';
		};
		$scope.getHTMLDesc = function(){
			if ($scope.part.content === undefined){
				return '';
			}
			for (var i = $scope.part.content.length - 1; i >= 0; i--) {
				var con = $scope.part.content[i];
				if(con.contentType.Type === 'HTMLDescription'){
					return con.text;
				}
			}
			return '';
		};
		$scope.getBullets = function(){
			var bulls = [];
			if ($scope.part.content === undefined){
				return bulls;
			}
			for (var i = $scope.part.content.length - 1; i >= 0; i--) {
				var con = $scope.part.content[i];
				if(con.contentType.Type === 'Bullet' && bulls.indexOf(con.text) === -1){
					bulls.push(con.text);
				}
			}
			return bulls;
		};
		$scope.getPrice = function(){
			if($scope.part.pricing === undefined || $scope.part.pricing === null){
				return '';
			}
			for (var i = $scope.part.pricing.length - 1; i >= 0; i--) {
				var pr = $scope.part.pricing[i];
				if(pr.type === 'Jobber'){
					return '$'+pr.price;
				}
			}
			return '';
		};
		$scope.getInstallSheet = function(){
			if($scope.part === undefined || $scope.part.install_sheet === undefined){
				return '';
			}
			if($scope.part === null || $scope.part.install_sheet === null){
				return '';
			}
			return $scope.part.install_sheet.Scheme +'://'+$scope.part.install_sheet.Host+$scope.part.install_sheet.Path;
		};
		$scope.getInstallVideo = function(){
			if($scope.part === undefined || $scope.part.videos === undefined){
				return '';
			}
			if($scope.part === null || $scope.part.videos === null){
				return '';
			}

			for (var i = $scope.part.videos.length - 1; i >= 0; i--) {
				var vid = $scope.part.videos[i];
				if(vid.Type === 'Installation Video'){
					return vid.YouTubeVideoId;
				}
			}
			return '';
		};
	}]);
});