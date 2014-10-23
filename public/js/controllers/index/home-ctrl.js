/**
 * Home controller definition
 */
define(['./module'], function (module) {
	'use strict';

	module.controller('HomeController', ['$scope', 'TestimonialService', function($scope, TestimonialService){
		$scope.testimonials = [];
		TestimonialService.GetRandom(function(testimonials, err){
			if(err){
				return;
			}
			$scope.testimonials = testimonials;
		});
	}]);
});