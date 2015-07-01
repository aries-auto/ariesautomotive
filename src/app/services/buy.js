'use strict';

angular.module('ariesautomotive').factory('BuyService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		local: function(coords){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/dealers/local',
				params: {
					'key': AppConfig.APIKEY,
					'latlng': coords.latitude + ',' + coords.longitude
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);
