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
		getApplications: function(col){
			var def = $q.defer();
			$http({
				method: 'post',
				url: AppConfig.APIURL + '/vehicle/mongo/apps?key=' + AppConfig.APIKEY,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'jsonp',
				data:$.param({
					collection: col
				}),
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);
