'use strict';

angular.module('ariesautomotive').controller('BuyController', ['$scope', '$rootScope', '$stateParams', '$anchorScroll', '$location', '$timeout', 'ngDialog', 'localStorageService', 'BuyService', 'uiGmapGoogleMapApi', 'uiGmapIsReady' , '$analytics', function($scope, $rootScope, $stateParams, $anchorScroll, $location, $timeout, ngDialog, localStorage, BuyService, GoogleMapApi, isReady, $analytics){
	//mobile view-setter
	$scope.location_limit = 4;
	var MOBILE_WIDTH = '860';
	$scope.mobile_view = false;
	if (window.innerWidth <= MOBILE_WIDTH){
		$scope.mobile_view = true;
		$scope.location_limit = 999;
	}

	$rootScope.pageTitle = "ARIES Automotive | Where to Buy";
	$rootScope.pageKywds = "aries, automotive, dealer locator, where to buy";
	$scope.platEnabled = true;
	$scope.goldEnabled = true;
	$scope.silverEnabled = true;
	$scope.locLoaded = false;


	var lastBounds = {};
	var polyClick = function(gPoly){
		var path = gPoly.getPath();
		if (path.getLength() === 0){
			return;
		}
		var lat = path.getAt(0).lat();
		var lng = path.getAt(0).lng();
		$scope.map.zoom = 10;
		$scope.position.coords = {
			latitude: lat,
			longitude: lng
		};
		$scope.map.center = {
            latitude: $scope.position.coords.latitude,
            longitude: $scope.position.coords.longitude
        };
		$scope.map.refresh = true;
		$scope.$apply();
	};

	var boundsChange = function(gMap){
		var bnds = gMap.getBounds();
		if(bnds === lastBounds){
			return;
		}else if (gMap.zoom < 6 || $scope.map.zoom < 6) {

			BuyService.regions().then(function(data){
				$scope.map.polys = data;
			});
			$scope.locations = [];
			return;
		}


		lastBounds = bnds;
		var center = bnds.getCenter();
		var ne = bnds.getNorthEast();
		var sw = bnds.getSouthWest();
		var centerStr = center.lat() + ',' + center.lng();
		var neStr = ne.lat() + ',' + ne.lng();
		var swStr = sw.lat() + ',' + sw.lng();
		$scope.locations = [];
		var sort = 2;
		// if($scope.map.zoom > 6 && $scope.map.zoom < 9){
		// 	sort = 2;
		// }else if($scope.map.zoom > 8){
		// 	sort = 1;
		// }
		getByBounds(centerStr, neStr, swStr, 0 , 100, sort);
	};

	var getByBounds = function(center, ne, sw, skip, count, sort){
		$scope.loadingLocations = true;
		BuyService.bounds(center, ne, sw, skip, count, sort).then(function(data){
			if (data === null || data.length === 0){
				$scope.loadingLocations = false;
				return;
			}
			var mapLocations = [];
			var platLocations = [];
			var goldLocations = [];
			var silvLocations = [];
			for (var i = 0; i < data.length; i++) {
				var el = data[i];
				if(el !== undefined && el !== null && el.id !== undefined && el.id !== null && el.dealerType !== undefined){
					data[i].icon = el.dealerType.mapIcon.mapIcon.Scheme + '://' + el.dealerType.mapIcon.mapIcon.Host + el.dealerType.mapIcon.mapIcon.Path;
				}
				// handle the toggle buttons for each dealer tier
				if(el.dealerTier.tier == "Platinum" && $scope.platEnabled === true){
					// handle discount hitch being first, ugh.
					if (el.customerId === 10444250){
						platLocations.unshift(data[i]); // love unshift
					}else{
						platLocations.push(data[i]);
					}
					mapLocations.push(data[i]);
				}
				if(el.dealerTier.tier == "Gold" && $scope.goldEnabled === true){
					goldLocations.push(data[i]);
					mapLocations.push(data[i]);
				}
				if(el.dealerTier.tier == "Silver" && $scope.silverEnabled === true){
					silvLocations.push(data[i]);
					mapLocations.push(data[i]);
				}
			}
			// Handle different tiers
			$scope.platLocations = platLocations;
			$scope.goldLocations = goldLocations;
			$scope.silvLocations = silvLocations;
			// handle map locations
			$scope.locations = mapLocations;

			if(data.length === count){
				getByBounds(center, ne, sw, $scope.locations.length, count, sort);
			}else{
				$scope.loadingLocations = false;
			}
		});
	};

    var plotPosition = function(pos){
        if(pos.coords === undefined || pos.coords === null){
			return;
		}

        $scope.position = {
			coords: {
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
			}
		};
		$scope.map.center = $scope.coordinates = {
			latitude: pos.coords.latitude,
			longitude: pos.coords.longitude
		};
		$scope.map.zoom = 10;
		$scope.locLoaded = true;
        localStorage.set('position', pos);
        $scope.map.refresh = true;
		if (!$scope.$$phase) {
			$scope.$apply();
		}
    };

    var failedPosition = function(){
		$scope.locLoaded = true;
        if ($scope.position === undefined){
            $rootScope.$broadcast('error', 'Failed to retrieve your location');
        }

		ngDialog.open({
			template: 'app/controllers/wheretobuy/location-form.html',
			scope: $scope,
			closeByNavigation: true,
			controller: ['$scope',function($scope){
				$scope.lookupLocation = function(){
					var val = document.getElementById('autocomplete').value;
					$scope.$parent.lookupLocation(val);
				};
			}]
		});

		$scope.map.center = {
			latitude: 44.8167,
			longitude: -91.5000
		};
		$scope.map.zoom = 4;
		$scope.position = {};
		$scope.coordinates = $scope.position.coords = $scope.map.center;
		$scope.$apply();
    };


    var updateLocations = function(){
        $scope.coordinates.latitude = $scope.position.coords.latitude;
        $scope.coordinates.longitude = $scope.position.coords.longitude;

		$scope.map.center = {
            latitude: $scope.position.coords.latitude,
            longitude: $scope.position.coords.longitude
        };

		if($scope.map.zoom < 5){
			BuyService.regions().then(function(data){
				$scope.map.polys = data;
			});
			$scope.locations = [];
		}


    };

	$scope.locations = [];
	$rootScope.search = '';
	$scope.display = $location.hash() || 'local';
    $scope.coordinates = {};

    $scope.map = {
        markerIcon: 'http://www.curtmfg.com/Content/img/mapflag.png',
        show: false,
        control: {},
		doCluster: true,
        showTraffic: false,
        showBicycling: false,
        showWeather: false,
        showHeat: false,
        center: {
			latitude: 44.8167,
			longitude: -91.5000
        },
        options:{
            streetViewControler: false,
            panControl: false,
            maxZoom: 20,
            minZoom: 3
        },
        zoom: 10,
		pan: true,
        dragging: false,
        bounds: {},
        markers: [],
        events: {
			idle: boundsChange
		},
		polyEvents: {
			click: polyClick
		}
    };

	$scope.generateIcon = function(obj){
		if(obj.Scheme === undefined){
			return '';
		}
		return obj.Scheme + '://' + obj.Host + obj.Path;

	};

	$scope.changeDisplay = function(disp, e){
		$scope.display = disp;
		$scope.map.show = false;
		if (disp === 'local') {
			$timeout(function(){
				$scope.map.show = true;
				$scope.map.refresh = true;
			});
		}
		if ($scope.online === undefined){
			getOnline();
		}
		$location.hash(disp);
		e.preventDefault();
	};

	$scope.panTo = function(l){
		for (var i = 0; i < $scope.locations.length; i++) {
			if($scope.locations[i].id === l.id){
				$scope.locations[i].show = true;
			}else{
				$scope.locations[i].show = false;
			}
		}
		$anchorScroll('#map');
	};

	$scope.lookupLocation = function(val){
		$scope.geocoder.geocode({'address': val},function(results, status){
			if(status !== google.maps.GeocoderStatus.OK){
				$rootScope.$broadcast('error', 'Failed to find location');
				return;
			}
			ngDialog.closeAll();
			$scope.map.center = {
				latitude: results[0].geometry.location.lat(),
				longitude: results[0].geometry.location.lng()
			};
			$scope.map.zoom = 10;
			$scope.map.refresh = true;

			$scope.$apply();
		});
	};

	$scope.loadDirections = function(end){
		$scope.directions = {
			end: end
		};
		$analytics.eventTrack('wtb-directions-to:' + end);
		ngDialog.open({
			template: 'app/controllers/wheretobuy/directions-form.html',
			scope: $scope,
			controller: ['$scope',function($sc){
				$sc.getDirections = function(){
					$sc.$parent.directions.start = document.getElementById('directions-start').value || '';
					$analytics.eventTrack('wtb-directions-from:' + $sc.$parent.directions.start);
					$sc.$parent.getDirections();
				};
			}]
		});
	};

	$scope.getDirections = function(){
		ngDialog.closeAll();
		var request = {
			origin: $scope.directions.start,
			destination: $scope.directions.end,
			travelMode: $scope.maps.TravelMode.DRIVING
		};
		$scope.directionsService.route(request, function(response, status){
			if(status === $scope.maps.DirectionsStatus.OK){
				$scope.directionsDisplay.setDirections(response);
			}
		});
	};

    $scope.$watch('position',function(){
    	$scope.map.show = true; // don't wait on geo location to show map. Downside is map will eventually snap to the result of getCurrentPosition()
        if ($scope.position === undefined || $scope.position.coords === undefined || $scope.position.coords === null){
            return;
        }
        $scope.map.refresh = true;
        updateLocations();
    });

	$scope.$on('ngDialog.opened',function(){
		var el = document.getElementById('autocomplete') || document.getElementById('directions-start');
		if(el === undefined || el === null){
			return;
		}
		$scope.autocomplete = new google.maps.places.Autocomplete(
			(el),
			{
				types: ['geocode']
			}
		);
	});

    GoogleMapApi.then(function(maps){
		$scope.maps = maps;
		$scope.geocoder = new maps.Geocoder();
		$scope.directionsService = new maps.DirectionsService();
		isReady.promise(1).then(function(instances){
			angular.forEach(instances, function(inst){
				$scope.directionsDisplay = new maps.DirectionsRenderer();
				$scope.directionsDisplay.setMap(inst.map);
			});
		});

		var els = document.getElementsByClassName('autocomplete');
		// Google Analytics
		if(els.length > 0){
			var comp = $scope.autocomplete = new maps.places.Autocomplete(
				(els[0]),
				{
					types: ['geocode']
				}
			);

			maps.event.addListener(comp, 'place_changed', function(){
				var place = comp.getPlace();
				if(place === undefined){
					return;
				}

				$analytics.eventTrack('wtb-search:' + place.formatted_address);
				if(place.formatted_address !== '' && place.formatted_address !== undefined){
					$scope.lookupLocation(place.formatted_address);
				}else{
					$scope.lookupLocation(place.name);
				}
			});
		}
		if($stateParams.location !== ''){
			$scope.geocoder.geocode({'address': $stateParams.location},function(results, status){
				if(status !== google.maps.GeocoderStatus.OK){
					$rootScope.$broadcast('error', 'Failed to find location');
					return;
				}
				$scope.map.center = {
					latitude: results[0].geometry.location.lat(),
					longitude: results[0].geometry.location.lng()
				};
				$scope.map.zoom = 10;
				$scope.map.refresh = true;
				$scope.$apply();
			});
		}

		BuyService.geoLocateIP().then(function(res) {
			$scope.map.center = $scope.coordinates = {
				latitude: res.location.lat,
				longitude: res.location.lng
			};

            $scope.position = {
				coords: {
					latitude: res.location.lat,
					longitude: res.location.lng
				}
			};
	        plotPosition($scope.position);
		}, function(error){
			// in case getting by ip fails, the default location of Eau Claire will be loaded
			$scope.locLoaded = true;
		});

    });

	$scope.LookupGeoLoc = function(){
		if (Modernizr.geolocation) {
			var geoOptions = {
		            enableHighAccuracy: true,
		            timeout: 10000,
		            maximumAge: Infinity // Infinity says to try to pull from cache if possible
		    };
            navigator.geolocation.getCurrentPosition(plotPosition, failedPosition, geoOptions);
			return;
		}
	}

	$scope.toggleTier = function(tier){
		if (tier === "Platinum"){
			if ($scope.platEnabled === true){
				$scope.platEnabled = false;
			}else{
				$scope.platEnabled = true;
			}
		}
		if (tier === "Gold"){
			if ($scope.goldEnabled === true){
				$scope.goldEnabled = false;
			}else{
				$scope.goldEnabled = true;
			}
		}
		if (tier === "Silver"){
			if ($scope.silverEnabled === true){
				$scope.silverEnabled = false;
			}else{
				$scope.silverEnabled = true;
			}
		}
		// refresh map	- kinda hacky, will revisit
        $scope.map.show = true;
        $scope.map.refresh = true;
		$scope.map.center = {
            latitude: $scope.map.center.latitude + .0001,
            longitude: $scope.map.center.longitude
        };
	};
	if ($location.hash() == "online"){
		getOnline();
	}

	function getOnline(){
		BuyService.online(0, 100).then(function(res) {
			var platinums = [];
			var golds = [];
			var silvers = []
			res.forEach(function(d){
				switch(d.dealerTier.tier){
					case "Platinum":
						platinums.push(d);
						break;
					case "Gold":
						golds.push(d);
						break;
					case "Silver":
						silvers.push(d);
						break;
					default:
						silvers.push(d);
				}
			});
			platinums.sort(randomOrder);
			golds.sort(randomOrder);
			silvers.sort(randomOrder);
			$scope.onlinePlats = platinums;
			$scope.onlineGolds = golds;
			$scope.onlineSilvs = silvers;

		});
	}

	function randomOrder(){
		return (Math.round(Math.random())-0.5);
	}


}]);
