'use strict';

angular.module('ariesautomotive').factory('LookupService', ['$http', '$q','AppConfig', function($http, $q, AppConfig){
	return {
		collections: function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/vehicle/mongo/cols',
				headers:{
					'Content-Type':'application/json; charset=UTF-8'
			},
				responseType: 'jsonp',
				params: { 'key': AppConfig.APIKEY}
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		query : function(vehicle){
			var def = $q.defer();

			$http({
				method:'post',
				url:AppConfig.APIURL + '/vehicle/mongo',
				data:$.param(vehicle),
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params: {'key': AppConfig.APIKEY}
			}).success(def.resolve).error(def.reject);

			return def.promise;
		},
		inquire : function(inquiry){
			var def = $q.defer();
			$http({
				method:'post',
				url:AppConfig.APIURL + '/vehicle/inquire',
				data:inquiry,
				headers:{
					'Content-Type': 'application/json; charset=UTF-8'
				},
				responseType: 'jsonp',
				params: {
					'key': AppConfig.APIKEY
				}
			}).success(def.resolve).error(def.reject);

			return def.promise;
		}
	};
}]);