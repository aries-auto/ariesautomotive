'use strict';

angular.module('ariesautomotive').controller('SearchController', ['$scope', 'SearchService', '$stateParams','$sce', '$location', '$anchorScroll', 'AppConfig', '$rootScope', function($scope, SearchService, $stateParams, $sce, $location, $anchorScroll, AppConfig, $rootScope){
	$scope.parts = [];
	$scope.query = '';
	$scope.loadingMore = false;
	$scope.total_hits = 0;
	$scope.took = 0;

	// paging variables
	var page = 1;
	var count = 24;

	$rootScope.pageTitle = "ARIES Automotive | Search";
	$rootScope.pageDesc = "Finding grille guards, bull bars, side bars and other ARIES parts for your vehicle is easy using the ARIES product search bar and part lookup tool.";
	$rootScope.pageKywds = "aries, automotive, product search";

	if($stateParams !== undefined && $stateParams.term !== undefined && $stateParams.term !== ''){
		$scope.query = $stateParams.term;

		SearchService.Search($scope.query, page, count).then(function(data){
			if(data === undefined || data.hits === undefined || data.hits.hits === undefined){
				return;
			}

			$scope.total_hits = data.hits.total;
			$scope.took = parseFloat((data.took * .001).toFixed(4));

			angular.forEach(data.hits.hits, function(hit){
				if(hit._type === 'part'){
					$scope.parts.push(hit._source);
				}
			});
		});
	}

	$scope.renderHTML = function(content){
		return $sce.trustAsHtml(content);
	};

	$scope.loadMore = function(index, inview, inviewpart, event){
		if($scope.loadingMore){
			return;
		}

		$('.pagination').css('opacity','0.6');

		page++;
		SearchService.Search($scope.query, page, count).then(function(data){
			if(data === undefined || data.hits === undefined || data.hits.hits === undefined){
				return;
			}

			angular.forEach(data.hits.hits, function(hit){
				if(hit._type === 'part'){
					$scope.parts.push(hit._source);
				}
			});
		});

	};

	$scope.scrollTo = function(elementId){
		$location.hash(elementId);
		$anchorScroll();
	};
}]);
