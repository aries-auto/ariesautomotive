define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.contact',
		[]).factory('ContactService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetContactTypes : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/contact/types' + '?key=' + AppConfig.APIKEY,
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