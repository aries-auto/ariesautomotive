'use strict';

angular.module('ariesautomotive').controller('NavbarController', ['$scope', '$location', '$state', function ($scope, $location, $state) {
	$scope.search_term = '';
	$scope.search = function(){
		if ($scope.exact){
			$state.go('search exact',{'term': $scope.search_term, 'exact': $scope.exact});
		}else{
			$state.go('search',{'term': $scope.search_term});
		}
	};
}]);
