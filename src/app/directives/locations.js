angular.module('ariesautomotive').directive('locations', function() {
	return {
		restrict: 'E',
		scope: {
			locations: '=locations'
		},
		templateUrl: 'app/controllers/wheretobuy/locations.html',
		controller: 'BuyController'
	};
});