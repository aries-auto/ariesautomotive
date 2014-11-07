/**
 * Home controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('HomeController', ['$scope', 'TestimonialService', 'PartService' , function($scope, TestimonialService, PartService){
		$scope.testimonials = [];
		$scope.featuredProducts = [];

		TestimonialService.GetRandom({count: 2, randomize: true}).then(function(testimonials){
			$scope.testimonials = testimonials;
		});

		PartService.GetFeatured().then(function(featured){
			$scope.featuredProducts = featured;
		});
	}]);
});