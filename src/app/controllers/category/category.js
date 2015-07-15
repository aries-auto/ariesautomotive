'use strict';

angular.module('ariesautomotive').controller('CategoryController', ['$scope', '$stateParams', '$sce', 'CategoryService', '$location', '$anchorScroll', '$rootScope', 'TitleService', function($scope, $stateParams, $sce, CategoryService, $location, $anchorScroll, $rootScope, TitleService){
	$scope.category = {};
	$scope.loadingMore = false;
	$scope.parts = [];
	$scope.page = $location.search().page;
	$scope.count = $location.search().count;
	if ($scope.page === undefined || $scope.page === null){
		$scope.page = 1;
	}
	if ($scope.count === undefined){
		$scope.count = 12;
	}

	if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
		CategoryService.GetCategory($stateParams.id, $scope.page, $scope.count).then(function(cat){
			$scope.category = cat;
			var titleText = $scope.category.title + " | Aries Automotive Products";
			$rootScope.titleservice = TitleService;
			$rootScope.titleservice.set(titleText);
		});

		var page = $scope.page;
		while (page > 0){
			CategoryService.parts($stateParams.id, page, $scope.count).then(function(data){
				$scope.category.product_listing = data;
				if(data.parts !== undefined && data.parts !== null){
					for (var i = 0; i < data.parts.length; i++) {
						var p = data.parts[i];
						$scope.parts.unshift(p);
					};
				}

			});
			page--;
		}
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
		$scope.page++;
		$location.search('page', $scope.page);
		$location.search('count', $scope.count);

		CategoryService.parts($scope.category.id, $scope.category.product_listing.page, $scope.category.product_listing.per_page).then(function(data){
			if(data.parts === undefined || data.parts === null){
				data.parts = [];
				data.total_items = $scope.category.product_listing.parts.length;
			}
			$scope.category.product_listing = data;
			$scope.parts = $scope.parts.concat(data.parts);
			$scope.loadingMore = false;
			$('.pagination').css('opacity','1.0');
		});
	};
	$scope.scrollTo = function(elementId){
		$location.hash(elementId);
		$anchorScroll();
	};

}]);
