/**
 * Category controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('CategoryController', ['$scope', 'Category', function(scope, Category){
		Category.GetParents(function(parentCats, err){
			if(err){
				console.log(err);
				return;
			}
			scope.parentCats = parentCats;
		});
	}]);
});