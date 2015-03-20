'use strict';

angular.module('ariesautomotive').factory('GeographyService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
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
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);