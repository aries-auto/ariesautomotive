'use strict';

angular.module('ariesautomotive').factory('TestimonialService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		GetRandom : function(params){
			var url = AppConfig.APIURL + '/testimonials?key=' + AppConfig.APIKEY;

			if(params.page !== null && params.page !== undefined){
				url += '&page='+params.page.toString();
			}

			if(params.count !== null && params.count !== undefined){
				url += '&count='+params.count.toString();
			}
			
			if(params.randomize !== null && params.randomize !== undefined){
				url += '&randomize=' + params.randomize.toString();
			}

			var def = $q.defer();
			$http({
				method: 'get',
				url: url + '&brandID='+AppConfig.BRAND_ID ,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);