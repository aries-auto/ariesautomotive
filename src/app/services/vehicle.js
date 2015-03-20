'use strict';

angular.module('ariesautomotive').factory('VehicleService', ['$http', '$q','AppConfig', function($http, $q, AppConfig){
	return {
		// GetApplicationGuidesByWebsite : function(id){
		// 	var def = $q.defer();
		// 	$http({
		// 		method: 'get',
		// 		url: AppConfig.APIURL + '/applicationGuide/website/'+id+'?key=' + AppConfig.APIKEY,
		// 		headers: {
		// 			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		// 		}
		// 	}).success(def.resolve).error(def.reject);
		// 	return def.promise;
		// }

		
	};
}]);