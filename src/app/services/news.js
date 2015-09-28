'use strict';

angular.module('ariesautomotive').factory('NewsService', ['$http', '$q', 'AppConfig', function ($http, $q, AppConfig) {
	return {
		getAll : function() {
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/news?key=' + AppConfig.APIKEY + '&brandID=' + AppConfig.BRAND_ID
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},

		get : function(id) {
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/news/' + id + '?key=' + AppConfig.APIKEY
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);