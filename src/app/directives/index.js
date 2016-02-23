'use strict';

angular.module('ariesautomotive').directive('partLookup',function(){
	return {
		restrict: 'E',
		replace:true,
		transclude: true,
		templateUrl: '/js/controllers/lookup/index.html',
		controller: 'LookupController'
	};
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
			finish: '=',
			location: '='
		},
		link: function(scope, el){
			var finish = scope.finish;
			var app = scope.app;
			var loc = scope.location;
			angular.forEach(app.parts, function(p){
				if (p.finish === finish || p.color === finish && (loc === undefined || loc === '' || p.location === loc)){

					var el2 = '<div class="partLink"><a href="/part/' + p.oldPartNumber + '" title="View ' + p.oldPartNumber + '">'+p.oldPartNumber+' - ' + p.short_description || p.category + '</a>';
					if (p.install_sheet && p.install_sheet !== '') {
						el2 += '<a class="installLink" target="_blank" href="' + p.install_sheet + '" title="Installation Sheet for ' + p.oldPartNumber +'"><span class="glyphicon glyphicon-wrench"></span></a>';
					}
					el2 += '</div>';
					el.after(el2);
				}
			});
		}
	};
}).directive('appguideInstallLink', function(){
	return {
		restrict: 'AE',
		scope:{
			app: '='
		},
		link: function(scope, el){
			var app = scope.app;
			angular.forEach(app.parts, function(p){
				if (p.install_sheet !== ''){
					el.attr('href', p.install_sheet);
					el.attr('target', '_blank');
					el.html(p.oldPartNumber);
				}
			});
		}
	};
});
