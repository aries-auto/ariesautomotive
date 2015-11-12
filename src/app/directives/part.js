angular.module('ariesautomotive').directive('partBox', function() {
	return {
		restrict: 'E',
		scope: {
			p: '=part'
		},
		templateUrl: '/app/controllers/part/part_box.html',
		controller: 'PartController'
	};
});