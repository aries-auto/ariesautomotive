define(['angular'], function(angular){
	'use strict';

	angular.module('app.directives.index',[]).directive('partLookup',function(){
		return {
			restrict: 'E',
			replace:true,
			transclude: true,
			templateUrl: '/js/controllers/lookup/index.html',
			controller: 'LookupController'
		}
	});
});