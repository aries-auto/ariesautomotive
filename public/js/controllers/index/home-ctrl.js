/**
 * Home controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('HomeController', ['$scope', 'TestimonialService', 'PartService' , function($scope, TestimonialService, PartService){
		$scope.testimonials = [];
		$scope.featuredProducts = [];
		TestimonialService.GetRandom(function(testimonials, err){
			if(err){
				return;
			}
			$scope.testimonials = testimonials;
		});

		PartService.GetFeatured(function(featured, err){
			if(err){
				return;
			}
			$scope.featuredProducts = featured;
		});

	}]);
});