'use strict';

angular.module('ariesautomotive').factory('BecomeDealerService', ['$http', 'AppConfig','$q', function($http, AppConfig,$q){
	return {
		GetBusinessClasses : function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/dealers/business/classes',
				params: {
					'key': AppConfig.APIKEY,
					'brandID':AppConfig.BRAND_ID
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		PostContactData : function(contact){
			var def = $q.defer();
			$http({
				method: 'post',
				url: AppConfig.APIURL + '/contact/51', //51 is become a dealer contact type ID
				data: contact,
				params: {
					'key': AppConfig.APIKEY
				},
				headers: {
					'Content-Type': 'application/json'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);
