'use strict';

angular.module('ariesautomotive').controller('SearchController', ['$scope', 'SearchService', '$stateParams','$sce', '$location', '$anchorScroll', 'AppConfig', function($scope, SearchService, $stateParams, $sce, $location, $anchorScroll, AppConfig){
	$scope.parts = [];
	$scope.query = '';
	$scope.loadingMore = false;
	if($stateParams !== undefined && $stateParams.term !== undefined && $stateParams.term !== ''){
		$scope.query = $stateParams.term;

		SearchService.Search($scope.query).then(function(data){
			if(data === undefined || data.hits === undefined || data.hits.hits === undefined){
				return;
			}

			angular.forEach(data.hits.hits, function(hit){
				if(hit._type === 'part'){
					$scope.parts.push(hit._source);
				}
			});

		},function(){
			// search failed
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
		$scope.loadingMore = true;

		$scope.category.product_listing.page++;
		
	};
	$scope.scrollTo = function(elementId){
		$location.hash(elementId);
		$anchorScroll();
	};
}]);