angular.module('ariesautomotive').directive('partBox', function() {
	return {
		restrict: 'E',
		scope: {
			parts: '=parts'
		},
		templateUrl: 'app/controllers/part/part_box.html',
		controller: 'PartController'
	};
});