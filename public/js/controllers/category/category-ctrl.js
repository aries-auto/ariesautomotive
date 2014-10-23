/**
 * Category controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('CategoryController', ['$scope', '$location', 'CategoryService', 'ngSanitize' , function(scope, location, CategoryService, ngSanitize){
		var path = location.absUrl();
		var parts = path.split('/');
		var catID = parts.length - 1 > 0 ? parseInt(parts[parts.length - 1]) : 0;
		
		CategoryService.GetCategory(catID,function(cat, err){
			if(err){
				console.log(err);
				return;
			}
			scope.category = cat;
		})
	}]);
});