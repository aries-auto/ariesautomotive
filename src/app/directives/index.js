'use strict';

angular.module('ariesautomotive').directive('partLookup',function(){
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
}).directive('finishLink', function(){
	return {
		restrict: 'AE',
		scope:{
			app: '=',
			finish: '='
		},
		link: function(scope, el, attrs, ngModel){
			var finish = scope.finish;
			var app = scope.app;
			angular.forEach(app.parts, function(p){
				if (p.finish === finish){
					el.attr('title', 'View ' + p.oldPartNumber);
					el.html(p.oldPartNumber);
					el.attr('href', '/part/'+p.oldPartNumber);
				}
			});
		}
	}
}).directive('appguideInstallLink', function(){
	return {
		restrict: 'AE',
		scope:{
			app: '='
		},
		link: function(scope, el, attrs, ngModel){
			var app = scope.app;
			angular.forEach(app.parts, function(p){
				if (p.install_sheet !== ''){
					el.attr('href', p.install_sheet);
					el.html(p.oldPartNumber);
				}
			});
		}
	}
});;
