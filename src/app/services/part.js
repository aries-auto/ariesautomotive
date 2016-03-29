'use strict';

angular.module('ariesautomotive').factory('PartService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		GetPart : function(partID){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/part/'+partID,
				params: {
					'key' : AppConfig.APIKEY
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		GetPartByID: function(id){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/part/id/'+id,
				params: {
					'key': AppConfig.APIKEY
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		GetLatest : function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/part/latest',
				params: {
					'key' : AppConfig.APIKEY,
					'brandID':AppConfig.BRAND_ID
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		GetFeatured : function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/part/featured',
				params: {
					'key': AppConfig.APIKEY,
					'brandID':AppConfig.BRAND_ID
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);
