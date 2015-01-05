define(['angular'], function(angular){
	'use strict';

	angular.module('app.directives.index',[]).directive('partLookup',function(){
		return {
			restrict: 'E',
			templateUrl: 'js/controllers/lookup/index.html',
			require: 'ngModel',
			scope:{
				ngModel:'='
			},
			controller: 'LookupController'
		}
	});
});