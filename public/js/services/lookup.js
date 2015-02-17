define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.lookup',[])
		.factory('LookupService', ['$http', '$q','AppConfig','$rootScope', 'localStorageService', function($http, $q, AppConfig,$rootScope, localStorageService){
		return {
			set : function(vehicle){
				console.log(vehicle);
				localStorageService.set('vehicle',vehicle);
				$rootScope.$broadcast('vehicleChange',vehicle);
			},
			get : function(){
				return localStorageService.get('vehicle');
			},
			delete: function(){
				return localStorageService.remove('vehicle');
			},
			query : function(vehicle){
				var def = $q.defer();
				var params = vehicle;
				$http({
					method:'post',
					url:AppConfig.APIURL + '/vehicle',
					data:params,
					headers:{
						'Content-Type': 'application/json; charset=UTF-8'
					},
					responseType: 'jsonp',
					params: {
						'key': AppConfig.APIKEY
					}
				}).success(def.resolve).error(def.reject);

				return def.promise;
			}
		};
	}]);

});