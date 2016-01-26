'use strict';

angular.module('ariesautomotive').factory('BuyService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		local: function(coords, distance, skip, count){
			var def = $q.defer();
			var d = distance || 0;
			var s = skip || 0;
			var c = count || 500;
			$http({
				method: 'get',
				url: AppConfig.InternalURL + '/dealers/local',
				params: {
					'key': AppConfig.APIKEY,
					'latlng': coords.latitude + ',' + coords.longitude,
					'distance': d,
					'skip': s,
					'count': c,
					'brand': 3,
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		online: function(skip, count){
			var def = $q.defer();
			var s = skip || 0;
			var c = count || 500;
			$http({
				method: 'get',
				url: AppConfig.InternalURL + '/dealers/online',
				params: {
					'key': AppConfig.APIKEY,
					'skip': s,
					'count': c,
					'brand': 3,
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		bounds: function(center, ne, sw, skip, count, sort){
			var def = $q.defer();
			var s = skip || 0;
			var c = count || 500;
			$http({
				method: 'get',
				url: AppConfig.InternalURL + '/dealers/local/bounds',
				params: {
					'key': AppConfig.APIKEY,
					'center': center,
					'ne': ne,
					'sw': sw,
					'skip': s,
					'sort': sort,
					'count': c,
					'brand': 3
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},

		regions: function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.InternalURL + '/dealers/local/regions',
				params: {
					'key': AppConfig.APIKEY
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},

		geoLocateIP: function(){
			var def = $q.defer();
			//curl -d '' https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDn9YGVNo4kN7qqDD8t1qf613K6S0TTxuA
			$http({
				method: 'post',
				url: "https://www.googleapis.com/geolocation/v1/geolocate",
				params: {
					'key': AppConfig.GeoLocAPIKey
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);
