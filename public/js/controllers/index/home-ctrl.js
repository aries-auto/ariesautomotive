/**
 * Home controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('HomeController', ['$scope', 'TestimonialService', 'PartService' , function($scope, TestimonialService, PartService){
		$scope.testimonials = [];
		$scope.featuredProducts = [];
		var params = {count: 2, randomize: true};
		TestimonialService.GetRandom(params,function(testimonials, err){
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