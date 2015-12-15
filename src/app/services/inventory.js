'use strict';

angular.module('ariesautomotive').factory('InventoryService', ['$http', '$location', 'AppConfig', 'localStorageService', '$rootScope', function($http, $location, AppConfig, localStorageService, $rootScope) {
	return {
		getInventoryByParts: function(parts) {
				let partslist = '';
				parts.forEach(function(p) {
					partslist = partslist + ',' + p.id;
				});
				return $http({
					method: 'post',
					url: AppConfig.InternalURL + '/inventory/parts/',
					params: {
						'key': '92ff4404-2ca6-11e4-8756-42a10a10fd89',
						'partlist': partslist
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					responseType: 'json'
				});
			}
	};
}]);
