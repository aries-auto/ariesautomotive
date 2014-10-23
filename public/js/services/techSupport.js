define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.techSupport',[]).factory('TechSupportService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
		return {
			SubmitTechSupport: function(techSupport){
				var def = $q.defer();
				$http({
					method:'POST',
					url: AppConfig.APIURL + '/techSupport/'+232+'/'+true+'?key='+AppConfig.APIKEY,
					data:techSupport,
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