'use strict';

angular.module('ariesautomotive').factory('ApplicationGuideService', ['$http', '$q','AppConfig', function($http, $q, AppConfig){
	return {
		GetApplicationGuidesByWebsite: function(id){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/applicationGuide/website/'+id+'?key=' + AppConfig.APIKEY,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		getApplications: function(col, page){
			if(page === undefined){
				page = 0
			}
			var def = $q.defer();
			$http({
				method: 'post',
				url: AppConfig.APIURL + '/vehicle/mongo/apps?key=' + AppConfig.APIKEY,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'json',
				data:$.param({
					collection: col,
					page: page,
					limit: 100
				}),
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);
