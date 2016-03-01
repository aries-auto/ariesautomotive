'use strict';

angular.module('ariesautomotive').factory('SearchService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		Search: function(term, page, count, raw){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/search/'+term,
				params: {
					'key' : AppConfig.APIKEY,
					'page':page,
					'count':count,
					'brandID': AppConfig.BRAND_ID,
					'raw': raw
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);
