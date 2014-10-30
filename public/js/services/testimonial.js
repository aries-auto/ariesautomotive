define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.testimonial',
		[]).factory('TestimonialService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetRandom : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/testimonials?randomize=true&key=' + AppConfig.APIKEY,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(function(data, status, headers, config){
					callback(data, null);
				}).error(function(data, status, headers, config){
					callback(null, data);
				});
			}
		};
	}]);
});