'use strict';

angular.module('ariesautomotive').factory('SearchService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		Search : function(term, page, count){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/search/'+term.replace('-2',''),
				params: {
					'key' : AppConfig.APIKEY,
					'page':page,
					'count':count
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);