'use strict';

angular.module('ariesautomotive').factory('PartService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		GetPart : function(partID){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/part/old/'+partID,
				params: {
					'key' : AppConfig.APIKEY
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		GetOldPart: function(oldPartID){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/part/old/'+oldPartID,
				params: {
					'key': AppConfig.APIKEY
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		GetLatest : function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/part/latest',
				params: {
					'key' : AppConfig.APIKEY
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		GetFeatured : function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/part/featured',
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
