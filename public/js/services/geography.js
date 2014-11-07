define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.geography',
		[]).factory('GeographyService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
		return {
			GetCountryStates : function(){
				var def = $q.defer();
				$http({
					method: 'get',
					url: AppConfig.APIURL + '/geography/countrystates',
					params: {
						'key': AppConfig.APIKEY
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(def.resolve).error(def.reject);
				return def.promise;
			}
		};
	}]);
});