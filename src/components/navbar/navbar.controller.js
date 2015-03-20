'use strict';

angular.module('ariesautomotive').controller('NavbarController', ['$scope', '$location', function ($scope, $location) {
	$scope.search_term = '';
	$scope.search = function(){
		$location.path('/search/'+$scope.search_term);
	};
}]);
