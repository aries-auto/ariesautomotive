/**
 * Category controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('CategoryController', ['$scope', '$stateParams', '$sce', 'CategoryService' , function($scope, $stateParams, $sce, CategoryService){
		$scope.category = {};
		if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
			CategoryService.GetCategory($stateParams.id,function(cat, err){
				if(!err){
					$scope.category = cat;
				}
			});
		}

		$scope.renderHTML = function(content){
			return $sce.trustAsHtml(content);
		};

	}]);
});