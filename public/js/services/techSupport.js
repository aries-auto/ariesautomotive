define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.techSupport',[]).factory('TechSupportService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
		return {
			SubmitTechSupport: function(techSupport){
				var def = $q.defer();
				$http({
					method:'post',
					url: AppConfig.APIURL + '/techSupport/39/true?key='+AppConfig.APIKEY, //39 is tech services contactType
					data:techSupport,
					headers: {
						'Content-Type':'application/json; charset=UTF-8'
					},
					responseType: 'jsonp'
				}).success(def.resolve).error(def.reject);
				return def.promise;
			},
			GetTechSupportContactReceivers: function(){
				var def = $q.defer();
				$http({
					method:'get',
					url: AppConfig.APIURL + '/contact/types/receivers/11?key='+AppConfig.APIKEY, //11 is tech services contactType
					headers: {
						'Content-Type':'application/json; charset=UTF-8'
					},
					responseType: 'jsonp'
				}).success(def.resolve).error(def.reject);
				return def.promise;
			}
		};
	}]);
});