'use strict';

angular.module('ariesautomotive').controller('AppController', ['$scope', '$rootScope', '$location', 'CategoryService', function($scope, $rootScope, $location, CategoryService) {
	$scope.parentCats = [];
	$scope.search_term = '';
	CategoryService.GetParents().then(function(parentCats) {
		$scope.parentCats = parentCats;
	});

	$rootScope.goTo = function(path) {
		$location.path(path);
	};

	$scope.carousel_images = [{
		image: 'http://storage.googleapis.com/aries-website/hero-images/jeep.png',
		text: 'A NEW ERA OF BULL BARS IS HERE',
		button_text: 'VIEW BULL BARS',
		link: '/category/332'
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png',
		text: 'A NEW ERA OF GRILLE GUARDS IS HERE',
		button_text: 'VIEW PRO SERIES',
		link: '/category/331'
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png',
		text: 'A NEW ERA OF BUMPERS IS HERE',
		button_text: 'VIEW BUMPERS',
		link: '/category/324'
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg',
		text: 'ARIES Unveils StyleGuard™ as New Name for Floor Liners',
		button_text: 'VIEW STYLEGUARD™ FLOOR LINERS',
		link: '/category/321'
	}];

}]);
