'use strict';

angular.module('ariesautomotive').controller('NavbarController', ['$scope', '$location', '$state', function ($scope, $location, $state) {
	$scope.search_term = '';
	$scope.search = function(){
		$location.path('/search/'+$scope.search_term);
		$state.reload();
	};
}]);
