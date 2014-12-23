define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.lookup',
		[]).factory('LookupService', ['$http', '$q','AppConfig', function($http, $q, AppConfig){

		var savedVehicle = {};

		var domain = AppConfig.APIURL + '/vehicle';

		return {
			set : function(vehicle){
				savedVehicle = vehicle;
			},

			get : function(){
				return savedVehicle;
			},

			query : function(vehicle){
				var def = $q.defer();
				var params = vehicle;
				$http({
					method:'post',
					url:domain,
					data:params,
					headers:{
						'Content-Type': 'application/json; charset=UTF-8'
					},
					responseType: 'json',
					params: {
						'key': AppConfig.APIKEY
					}
				}).success(def.resolve).error(def.reject);


				return def.promise;
			}

		}
	}]);
});