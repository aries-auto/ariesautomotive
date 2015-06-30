'use strict';

angular.module('ariesautomotive').controller('BuyController', ['$scope', function($scope){
	$scope.locations = [];
    $scope.coordinates = {};

    var plotPosition = function(pos){
        $scope.coordinates = pos.coords;
    };
    if(Modernizr.geolocation){
        navigator.geolocation.getCurrentPosition(plotPosition);
    }

    $scope.$watch('coordinates', function(n){
        console.log(n);
    });
}]);
