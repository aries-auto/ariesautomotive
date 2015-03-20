'use strict';

angular.module('ariesautomotive').factory('SearchService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		Search : function(term){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/search/'+term,
				params: {
					'key' : AppConfig.APIKEY
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);