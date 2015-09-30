'use strict';

angular.module('ariesautomotive').controller('NewsController', ['$scope', 'NewsService', '$rootScope', '$state', '$sanitize', '$sce', function($scope, NewsService, $rootScope, $state, $sanitize, $sce) {

	$scope.news = [];
	$scope.count = 8; //headlines per page
	$scope.index = 0;

	if (!$state.params.id) {
		NewsService.getAll().then(function(resp) {
			if (resp === null || resp === undefined) {
				return;
			}
			for (var i = 0; i < resp.length; i++) {
				if ((new Date(resp[i].publishEnd) > new Date() || !(resp[i].publishEnd > 0)) && resp[i].active === true && new Date(resp[i].publishStart) <= new Date()) {
					$scope.news.push(resp[i]);
				}
			}
			$scope.pages = new Array(Math.ceil($scope.news.length / $scope.count));
		});
	}

	$scope.goto = function(page) {
		$scope.index = page * $scope.count;
	};

	if ($state.params.id) {
		NewsService.get($state.params.id).then(function(resp) {
			$scope.newsitem = resp;
		});
	}

	$scope.trustAsHtml = function(string) {
		return $sce.trustAsHtml(string);
	};

}]);
