'use strict';

angular.module('ariesautomotive').factory('CategoryService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		GetCategory: function(catid, page, count){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/category/'+catid,
				params: {
					'key' : AppConfig.APIKEY,
					'count':count,
					'page':page
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		parts: function(id,page,count){
			var def = $q.defer();
			$http({
				method: 'get',
				url:AppConfig.APIURL + '/category/' + id + '/parts',
				params:{
					'key':AppConfig.APIKEY,
					'page':page,
					'count':count
				},
				headers: {
					'Content-Type':'application/json; charset=UTF-8'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		GetParents: function(callback){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/category',
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