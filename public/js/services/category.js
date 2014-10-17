define(['angular'], function(angular){
	'use strict';

	angular.module('app.services', []).factory('Category', ['$http', 'AppConfig', function(http, AppConfig){
		return {
			GetParents : function(callback){
				http({
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