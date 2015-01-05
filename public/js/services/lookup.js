define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.lookup',
		[]).factory('LookupService', ['$http', '$q','AppConfig', function($http, $q, AppConfig){

		var savedVehicle = {};

		var domain = AppConfig.APIURL + '/vehicle';
		// var domain = "http://localhost:8081/vehicle"

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
						// 'key':'92fe956d-2ca6-11e4-8758-42010af0fd79'
					}
				}).success(def.resolve).error(def.reject);


				return def.promise;
			}

		}
	}]);
});