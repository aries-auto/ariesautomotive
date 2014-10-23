define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.category',[]).factory('CategoryService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
		return {
			GetCategory: function(catid, callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/category/' + catid + '?key=' + AppConfig.APIKEY,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(function(data, status, headers, config){
					callback(data, null);
				}).error(function(data, status, headers, config){
					callback(null, data);
				});
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
					responseType: 'json'
				}).success(def.resolve).error(def.reject);
				return def.promise;
			},
			GetParents: function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/category?key=' + AppConfig.APIKEY,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(function(data, status, headers, config){
					callback(data, null);
				}).error(function(data, status, headers, config){
					callback(null, data);
				});
			}
		};
	}]);
});