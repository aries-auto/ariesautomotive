define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.becomedealer',
		[]).factory('BecomeDealerService', ['$http', 'AppConfig','$q', function($http, AppConfig,$q){
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
			},
			PostContactData : function(contact){
				var def = $q.defer();
				$http({
					method: 'POST',
					url: AppConfig.APIURL + '/contact/15' + '?key=' + AppConfig.APIKEY,
					// url: 'http://localhost:8081/contact/15?key=' + AppConfig.APIKEY,
					data: contact,
					headers: {
						'Content-Type': 'application/json'
					}					
				}).success(def.resolve)
					.error(def.reject);
					return def.promise;
			}
		};
	}]);
});