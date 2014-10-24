define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.becomedealer',
		[]).factory('BecomeDealerService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetBusinessClasses : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/new/dealers/business/classes?key=' + AppConfig.APIKEY,
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