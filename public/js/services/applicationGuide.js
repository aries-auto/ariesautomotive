define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.applicationGuide',
		[]).factory('ApplicationGuideService', ['$http', '$q','AppConfig', function($http, $q, AppConfig){
		return {
			GetApplicationGuidesByWebsite : function(id){
				var def = $q.defer();
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/applicationGuide/website/'+id+'?key=' + AppConfig.APIKEY,
					// url: 'http://localhost:8081/applicationGuide/website/'+id+'?key=' + AppConfig.APIKEY,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(def.resolve).error(def.reject);
				return def.promise;
			},
			GetCategory : function(id){
				var def = $q.defer();
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/category/'+id+'?key=' + AppConfig.APIKEY,
					// url: 'http://localhost:8081/category/'+id+'?key=' + AppConfig.APIKEY,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(def.resolve).error(def.reject);
				return def.promise;
			}
		};
	}]);
});