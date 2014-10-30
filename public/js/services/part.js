define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.part',
		[]).factory('PartService', ['$http', 'AppConfig', function($http, AppConfig){
		return {
			GetPart : function(partID, callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/part/' + partID + '?key=' + AppConfig.APIKEY,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(function(data, status, headers, config){
					callback(data, null);
				}).error(function(data, status, headers, config){
					callback(null, data);
				});
			},
			GetOldPart: function(oldPartID, callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/part/old/' + oldPartID + '?key=' + AppConfig.APIKEY,
				}).success(function(data, status, headers, config){
					callback(data, null);
				}).error(function(data, status, headers, config){
					callback(null, data);
				});
			},
			GetLatest : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/part/latest?key=' + AppConfig.APIKEY,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).success(function(data, status, headers, config){
					callback(data, null);
				}).error(function(data, status, headers, config){
					callback(null, data);
				});
			},
			GetFeatured : function(callback){
				$http({
					method: 'GET',
					url: AppConfig.APIURL + '/part/featured?key=' + AppConfig.APIKEY,
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