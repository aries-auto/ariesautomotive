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
	}).directive('integer', function () {
		return {
			require:'ngModel',
			link: function(scope, element, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue){
					return parseInt(viewValue, 0);
				});
			}
		};
	});
});
