'use strict';

angular.module('ariesautomotive').controller('BuyController', ['$scope', '$rootScope', 'localStorageService', 'BuyService', 'uiGmapGoogleMapApi', function($scope, $rootScope, localStorage, BuyService, GoogleMapApi){
	$scope.locations = [];
    $scope.coordinates = {};
    $scope.map = {
        markerIcon: 'http://www.curtmfg.com/Content/img/mapflag.png',
        show: false,
        control: {},
        showTraffic: false,
        showBicycling: false,
        showWeather: false,
        showHeat: false,
        center: {
            latitude: 45,
            longitude: -73,
        },
        options:{
            streetViewControler: false,
            panControl: false,
            maxZoom: 20,
            minZoom: 3
        },
        zoom: 8,
        dragging: false,
        bounds: {},
        markers: [],
        events: {}
    };
    var geoOptions = {
            enableHighAccuracy: true,
            timeout: 500,
            maximumAge: 500
    };

    var plotPosition = function(pos){
        if(pos.coords !== undefined && pos.coords !== null){
            $scope.position = pos;
            localStorage.set('position', pos);
            updateLocations();
        }
    };
    var failedPosition = function(){
        if ($scope.position === undefined){
            $rootScope.$broadcast('error', 'Failed to retrieve your location');
        }
    };

    var updateLocations = function(){
        $scope.coordinates.latitude = $scope.position.coords.latitude;
        $scope.coordinates.longitude = $scope.position.coords.longitude;
        BuyService.local($scope.position.coords).then(function(data){
            if(data === undefined || data === null){
                return;
            }
            $scope.locations = data;
        });
    };

    $scope.$watch('position',function(){
        if ($scope.position === undefined || $scope.position.coords === undefined || $scope.position.coords === null){
            return;
        }
        $scope.map.center = {
            latitude: $scope.position.coords.latitude,
            longitude: $scope.position.coords.longitude
        };
        $scope.map.show = true;
        $scope.map.refresh = true;
        updateLocations();
    });

    GoogleMapApi.then(function(){
        if(Modernizr.geolocation){
            var pos = localStorage.get('position');
            if (pos === undefined || pos === null || pos.coords === undefined){
                navigator.geolocation.getCurrentPosition(plotPosition, failedPosition, geoOptions);
                navigator.geolocation.watchPosition(plotPosition, failedPosition, geoOptions);
            }else{
                $scope.position = pos;
            }
        }
    });

}]);
