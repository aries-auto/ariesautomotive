'use strict';

angular.module('ariesautomotive').controller('AppGuideController', ['$rootScope','$scope', '$stateParams', 'ApplicationGuideService', function($rootScope, $scope, $stateParams, ApplicationGuideService){
	$scope.collection = $stateParams.collection || '';
	$scope.applications = [];
	$scope.finishes = [];
	$scope.colors = [];
	$scope.location = false;

	$rootScope.pageTitle = "ARIES Automotive | Application Guides";
	$rootScope.pageKywds = "aries, automotive, applications, application guides, vehicles";


	var page = 0;

	$scope.getPart = function(f, app){
		angular.forEach(app.parts, function(p){
			return p;
		});
	};

	var parseLocations = function(apps){
		var low = 0;
		var high = 0;
		var last = {};
		angular.forEach(apps, function(app){
			if(last.make !== app.make || last.model !== app.model || last.style !== app.style){
				if (last.make !== undefined && $scope.applications.indexOf(last) === -1){
					last.startYear = low;
					last.endYear = high;
					last.locations = [];
					var existing = [];
					for (var j = 0; j < last.parts.length; j++) {
						var p = last.parts[j];
						if(p.location.length > 0 && existing[p.location] === undefined){
							$scope.location = true;
							last.locations.push(p.location);
							existing[p.location] = true;
						}
					}
					$scope.applications.push(last);
				}
				last = app;
				high = app.year;
				low = app.year;
			}else if(app.year < low){
				low = app.year;
			}else{
				last = {};
				high = 0;
				low = 0;
			}
		});
	}

	var getMore = function(page){
		ApplicationGuideService.getApplications($scope.collection, page).then(function(data){
			if(data.applications.length === 0){
				return;
			}

			$scope.finishes = data.finishes;
			$scope.colors = data.colors;
			parseLocations(data.applications);
			page = page + 1;
			getMore(page);
		});
	};

	getMore(page);

}]);
