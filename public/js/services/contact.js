define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.contact',
		[]).factory('ContactService', ['$http','$q', 'AppConfig', function($http, $q, AppConfig){
		return {
			GetContactTypes : function(){
				var def = $q.defer();
				$http({
					method: 'get',
					url: AppConfig.APIURL + '/contact/types',
					params:{
						'key' : AppConfig.APIKEY
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(def.resolve).error(def.reject);
				return def.promise;
			},
			PostContactData : function(data,contactType){
				var def = $q.defer();
				$http({
					method: 'post',
					url: AppConfig.APIURL + '/contact/' + contactType + '/',
					data:data,
					params: {
						'key': AppConfig.APIKEY
					},
					headers: {
						'Content-Type': 'application/json'
					}
				}).success(def.resolve).error(def.reject);
				return def.promise;
			}
		};
	}]);
});