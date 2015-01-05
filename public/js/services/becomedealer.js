define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.becomedealer',
		[]).factory('BecomeDealerService', ['$http', 'AppConfig','$q', function($http, AppConfig,$q){
		return {
			GetBusinessClasses : function(){
				var def = $q.defer();
				$http({
					method: 'get',
					url: AppConfig.APIURL + '/dealers/business/classes',
					params: {
						'key': AppConfig.APIKEY
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(def.resolve).error(def.reject);
				return def.promise;
			},
			PostContactData : function(contact){
				var def = $q.defer();
				$http({
					method: 'post',
					url: AppConfig.APIURL + '/contact/15',
					data: contact,
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