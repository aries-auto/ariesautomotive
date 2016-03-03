'use strict';

angular.module('ariesautomotive').controller('NavbarController', ['$scope', '$location', '$state', function ($scope, $location, $state) {
	$scope.search_term = '';
	$scope.search = function(){
		$state.go('search',{'term': $scope.search_term});
	};
}]);
