/**
 * Category controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('CategoryController', ['$scope', '$stateParams', '$sce', 'CategoryService' , function($scope, $stateParams, $sce, CategoryService){
		$scope.category = {};
		$scope.loadingMore = false;
		$scope.parts = []

		if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
			CategoryService.GetCategory($stateParams.id,function(cat, err){
				if(!err){
					$scope.category = cat;
					$scope.parts = $scope.category.product_listing.parts;
				}
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

	}]);
});