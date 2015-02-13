define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.applicationGuide',
		[]).factory('ApplicationGuideService', ['$http', '$q','AppConfig', function($http, $q, AppConfig){
		return {
			GetApplicationGuidesByWebsite : function(id){
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
			}
		};
	}]);
});