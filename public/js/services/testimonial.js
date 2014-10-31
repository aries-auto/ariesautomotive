define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.testimonial',
		[]).factory('TestimonialService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetRandom : function(params, callback){
				var url = AppConfig.APIURL + '/testimonials?key=' + AppConfig.APIKEY;

				if(params.page !== null && params.page !== undefined){
					url += '&page='+params.page.toString();
				}

				if(params.count !== null && params.count !== undefined){
					url += '&count='+params.count.toString();
				}
				
				if(params.randomize !== null && params.randomize !== undefined){
					url += '&randomize=' + params.randomize.toString();
				}

				$http({
					method: 'GET',
					url: url,
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