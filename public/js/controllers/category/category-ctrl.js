/**
 * Category controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('CategoryController', ['$scope', 'CategoryService', function($scope, CategoryService){
		CategoryService.GetParents(function(parentCats, err){
			if(err){
				console.log(err);
				return;
			}
			$scope.parentCats = parentCats;
		});
	}]);
});