define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.warranties',[]).factory('WarrantyService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
		return {
			SubmitWarranty: function(warranty){
				var def = $q.defer();
				$http({
					method:'POST',
					// url: AppConfig.APIURL + '/techSupport/232/true?key='+AppConfig.APIKEY,
					url:'http://localhost:8081/warranty/232/true?key='+AppConfig.APIKEY,
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
			},
			GetCountryStates: function(){
				var def = $q.defer();
				$http({
					method:'GET',
					// url: AppConfig.APIURL + '/geography/states?key='+AppConfig.APIKEY,
					url:'http://localhost:8081/geography/countrystates?key='+AppConfig.APIKEY
				}).success(function(data){
					def.resolve(data);
				}).error(function(){
					def.reject("Error");
				})
				return def.promise;
			},

			GetPart: function(id){
				var def = $q.defer();
				$http({
					method:'GET',
					// url: AppConfig.APIURL + '/part/'+id+'?key='+AppConfig.APIKEY,
					url:'http://localhost:8081/part/'+id+'?key='+AppConfig.APIKEY
				}).success(function(data){
					def.resolve(data);
				}).error(function(){
					def.reject("Error");
				})
				return def.promise;
			},
			GetOldPart: function(id){
				var def = $q.defer();
				$http({
					method:'GET',
					// url: AppConfig.APIURL + '/part/'+id+'?key='+AppConfig.APIKEY,
					url:'http://localhost:8081/part/old/'+id+'?key='+AppConfig.APIKEY
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