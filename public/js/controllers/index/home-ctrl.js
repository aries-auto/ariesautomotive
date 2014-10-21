/**
 * Home controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('HomeController', ['$scope', 'TestimonialService', function($scope, TestimonialService){
		TestimonialService.GetRandom(function(testimonials, err){
			if(err){
				console.log(err);
				return;
			}
			$scope.testimonials = testimonials;
		});
	}]);
});