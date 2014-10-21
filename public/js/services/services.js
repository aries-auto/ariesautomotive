define(['angular'], function(angular){
	'use strict';

	angular.module('app.services',
		[]).factory('CategoryService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetParents : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/category?key=' + AppConfig.APIKEY,
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
	}]).factory('GeographyService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetCountryStates : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/geography/countrystates?key=' + AppConfig.APIKEY,
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
	}]).factory('PartService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetLatest : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/part/latest?key=' + AppConfig.APIKEY,
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
	}]).factory('TestimonialService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetRandom : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/testimonials?randomize=true&count=2&key=' + AppConfig.APIKEY,
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