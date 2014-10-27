define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.warranties',[]).factory('WarrantyService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
		return {
			SubmitWarranty: function(warranty){
				var def = $q.defer();
				$http({
					method:'POST',
					url: AppConfig.APIURL + '/techSupport/6/false?key='+AppConfig.APIKEY, //6 is cust service Contacttype; false = no email
					// url:'http://localhost:8081/warranty/232/true?key='+AppConfig.APIKEY,
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