'use strict';

angular.module('ariesautomotive').controller('PartController', ['$scope', 'PartService', '$stateParams','$sce', 'AppConfig', '$rootScope', function($scope, PartService, $stateParams, $sce, AppConfig, $rootScope){
	$scope.part = {};
	$scope.featuredProducts = [];
	$scope.vehicles = [];
	if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
		PartService.GetPart($stateParams.id).then(function(part){
			$scope.part = part;

			var years = {
				maxYear: "",
				minYear: "",
				make: "",
				model: ""
			};

			var exists = [];
			var str = '';
			angular.forEach(part.vehicles, function(vehicle, k){
				var v = {
					year: vehicle.year,
					make: vehicle.make,
					model: vehicle.model,
					submodel: vehicle.submodel
				};

				if (v.year > years.maxYear) {
					years.maxYear = v.year;
				} else {
					if (years.minYear === "") years.minYear = v.year;
				}
				if (v.year < years.minYear) years.minYear = v.year;
				years.make = v.make;
				years.model = v.model;


				str = v.year+v.make+v.model+v.submodel;
				if(exists.indexOf(str) === -1){
					$scope.vehicles.push(v);
					exists.push(str);
				}
			});

			var titleStr = $scope.part.short_description + " | " + $scope.part.categories[0].short_description + " | " + years.minYear + "-" + years.maxYear + " " + years.make + " " + years.model;
			$rootScope.pageTitle = titleStr;
			$rootScope.pageDesc = $scope.part.categories[0].metaDescription;
			$rootScope.pageKywds = "aries, " + $scope.part.short_description + ", " + years.make + ", " + years.model;

		});
	}

	PartService.GetFeatured().then(function(featured){
		$scope.featuredProducts = featured;
	});

	$scope.renderYouTube = function(vid){
		if(vid.channels === undefined || vid.channels.length === 0){
			return '';
		}
		return $sce.trustAsHtml(vid.channels[0].embedCode.replace(vid.channels[0].foreignId,vid.channels[0].foreignId+'?rel=0'));
	};

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
		if ($scope.part.content === undefined || $scope.part.content === null){
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
			if(pr.type === 'List' && pr.price > 0){
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
		return $sce.trustAsResourceUrl($scope.part.install_sheet.Scheme +'://'+$scope.part.install_sheet.Host+$scope.part.install_sheet.Path);
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
	$scope.shadowbox = function(obj, type){
		switch(type){
			case 'video':
				console.log('implement shadowbox video');
				break;
			default:
				break;
		}
	};
	$scope.ShareFacebook = function(){
		if($scope.part === undefined){
			return '';
		}
		var facebookURL = "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fariesautomotive.com%2Fpart%2F" + $scope.part.oldPartNumber + "&_rdr";
		window.$windowScope = $scope;
		window.open(facebookURL, "Share Aries Automotive", "width=500, height=500");

	};
	$scope.ShareTwitter = function(){
		if($scope.part === undefined){
			return '';
		}
		var pageURL = "http%3A%2F%2Fariesautomotive.com%2Fpart%2F" + $scope.part.oldPartNumber;
		var tweetText = $scope.part.short_description + " - " + $scope.part.oldPartNumber;
		var twitterURL = "https://twitter.com/intent/tweet?text=" + tweetText + "&url=" + pageURL + "&via=ariesautomotive&original_referer=" + pageURL;
		window.$windowScope = $scope;
		window.open(twitterURL, "Tweet Aries Automotive", "width=500, height=500");
	};
	$scope.ShareGoogle = function(){
		if($scope.part === undefined){
			return '';
		}
		var googleURL = "https://plus.google.com/share?url=http%3A%2F%2Fariesautomotive.com%2Fpart%2F" + $scope.part.oldPartNumber;
		window.$windowScope = $scope;
		window.open(googleURL, "Share Aries Automotive", "width=500, height=500");
	};

}]);
