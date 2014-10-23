/**
 * Category controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('CategoryController', ['$scope', '$location', '$sce', 'CategoryService' , function($scope, $location, $sce, CategoryService){
		var path = $location.absUrl();
		var parts = path.split('/');
		var catID = parts.length - 1 > 0 ? parseInt(parts[parts.length - 1]) : 0;
		$scope.category = {};

		CategoryService.GetCategory(catID,function(cat, err){
			if(err){
				console.log(err);
				return;
			}
			$scope.category = cat;
			console.log($sce.trustAsHtml(cat.title));
		})
	}]);
});