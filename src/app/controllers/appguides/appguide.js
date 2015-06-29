'use strict';

angular.module('ariesautomotive').controller('AppGuideController', ['$scope', '$stateParams', 'ApplicationGuideService', function($scope, $stateParams, ApplicationGuideService){
	$scope.collection = $stateParams.collection || '';
	$scope.applications = [];
	$scope.finishes = [];
	$scope.colors = [];
	var page = 0;

	$scope.getPart = function(f, app){
		angular.forEach(app.parts, function(p){
			return p;
		});
	};

	var getMore = function(page){
		ApplicationGuideService.getApplications($scope.collection, page).then(function(data){
			if(data.applications.length === 0){
				return;
			}

			var low = 0;
			var high = 0;
			var last = {};
			$scope.finishes = data.finishes;
			$scope.colors = data.colors;
			for (var i = 0; i < data.applications.length; i++) {
				var thisApp = data.applications[i];
				if(last.make !== thisApp.make || last.model !== thisApp.model || last.style !== thisApp.style){
					if (last.make !== undefined && $scope.applications.indexOf(last) === -1){
						last.startYear = low;
						last.endYear = high;
						$scope.applications.push(last);
					}
					last = thisApp;
					high = thisApp.year;
					low = thisApp.year;
				}else if(thisApp.year < low){
					low = thisApp.year;
				}else{
					last = {};
					high = 0;
					low = 0;
				}
			}
			page = page + 1;
			getMore(page);
		});
	};

	getMore(page);

}]);
