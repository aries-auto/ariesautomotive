angular.module('ariesautomotive').filter('startFrom', function () {
	return function (input, start) {
        if (input === undefined || input === null || input.length === 0) return [];
        start = +start; //parse to int
        return input.slice(start);
    }
});