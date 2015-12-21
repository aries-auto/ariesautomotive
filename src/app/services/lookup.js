'use strict';

angular.module('ariesautomotive').factory('LookupService', ['$http', '$q', 'AppConfig', 'localStorageService', function($http, $q, AppConfig, localStorageService) {
	return {
		collections: function() {
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/vehicle/mongo/cols',
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				},
				responseType: 'jsonp',
				params: {
					'key': AppConfig.APIKEY
				}
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		query: function(vehicle) {
			var def = $q.defer();
			$http({
				method: 'post',
				url: AppConfig.APIURL + '/vehicle/mongo/allCollections',
				data: $.param(vehicle),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params: {
					'key': AppConfig.APIKEY
				}
			}).success(def.resolve).error(def.reject);

			return def.promise;
		},
		queryCategoryStyles: function(vehicle) {
			var def = $q.defer();
			$http({
				method: 'post',
				url: AppConfig.APIURL + '/vehicle/mongo/allCollections/category',
				data: $.param(vehicle),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params: {
					'key': AppConfig.APIKEY
				}
			}).success(def.resolve).error(def.reject);

			return def.promise;
		},
		checkStyleRequiredToAddToCart: function(cat) {
			if (!cat.available_styles || cat.available_styles.length > 0) {
				return true;
			}
			return false;
		},
		inquire: function(inquiry) {
			var def = $q.defer();
			$http({
				method: 'post',
				url: AppConfig.APIURL + '/vehicle/inquire',
				data: inquiry,
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				},
				responseType: 'jsonp',
				params: {
					'key': AppConfig.APIKEY
				}
			}).success(def.resolve).error(def.reject);

			return def.promise;
		},
		validateBaseVehicle: function(v) {
			if (v === undefined || v === null) {
				return false;
			}

			var props = ['year', 'make', 'model'];
			var i;
			for (i = 0; i < props.length; i++) {
				if (v[props[i]] === undefined || v[props[i]] === null || v[props[i]] === '') {
					return false;
				}
			}
			return true;
		},
		setVehicle: function(v) {
			return localStorageService.set('vehicle', v);
		},
		getVehicle: function() {
			return localStorageService.get('vehicle');
		},
		clear: function() {
			return localStorageService.remove('vehicle');
		},
		toString: function() {
			var v = localStorageService.get('vehicle');
			if (!v) {
				return '';
			}
			return v.year + " " + v.make + " " + v.model + " " + v.style;
		}
	};
}]);
