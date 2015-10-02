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
		text: 'NEVER FEAR THE UNCERTAIN ROAD',
		button_text: 'VIEW BULL BARS',
		link: '/category/332',
		order: 5
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png',
		text: 'FIND OUT WHAT IT MEANS TO BE A PRO',
		button_text: 'VIEW PRO SERIES',
		link: '/category/331',
		order: 2
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png',
		text: 'CHOOSE YOUR CONFIGURATION AND START CUSTOMIZING',
		button_text: 'VIEW BUMPERS',
		link: '/category/324',
		order: 3
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg',
		text: 'ARIES UNVEILS STYLEGUARD™ AS NEW NAME FOR FLOOR LINERS',
		button_text: 'READ MORE',
		link: '/news/47',
		order: 1
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/navyjeep.jpg',
		text: 'DECKED OUT JEEP TO BE DONATED TO NAVY SEAL FOUNDATION',
		button_text: 'READ MORE',
		link: '/news/48',
		order: 4
	}];

}]);
