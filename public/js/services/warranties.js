define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.warranties',[]).factory('WarrantyService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
		return {
			SubmitWarranty: function(warranty){
				var def = $q.defer();
				$http({
					method:'post',
					url: AppConfig.APIURL + '/warranty/24/false?key='+AppConfig.APIKEY, //24 is cust service Contacttype; false = no email
					data:warranty,
					headers: {
						'Content-Type':'application/json; charset=UTF-8'
					},
				}).success(function(data){
					def.resolve(data);
				}).error(function(){
					def.reject("Error");
				})
				return def.promise;
			}
		};
	}]);
});