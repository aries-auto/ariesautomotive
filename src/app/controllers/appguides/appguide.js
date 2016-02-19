'use strict';

angular.module('ariesautomotive').controller('AppGuideController', ['$rootScope','$scope', '$stateParams', 'ApplicationGuideService', function($rootScope, $scope, $stateParams, ApplicationGuideService){
	$scope.collection = $stateParams.collection || '';
	$scope.applications = [];
	$scope.finishes = [];
	$scope.colors = [];
	$scope.location = false;

	$rootScope.pageTitle = 'ARIES Automotive | Application Guides';
	$rootScope.pageKywds = 'aries, automotive, applications, application guides, vehicles';

	var page = 0;

	$scope.getPart = function(f, app){
		angular.forEach(app.parts, function(p){
			return p;
		});
	};

	$scope.GetFileLocation = function(type){
		switch($scope.collection.toLowerCase()) {
			case '3 in round side bars':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20SIDE%20BARS%20App%20Guide.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20SIDE%20BARS%20App%20Guide.xlsx';
			case '3 in round side bars, pro series':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20PRO%20SERIES%20SIDE%20BARS%20App%20Guide.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20PRO%20SERIES%20SIDE%20BARS%20App%20Guide.xlsx';
			case '4 in oval side bars':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20App%20Guide.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20App%20Guide.xlsx';
			case '4 in oval side bars, wheel to wheel':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20-%20W2W%20App%20Guide.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20-%20W2W%20App%20Guide.xlsx';
			case '6 in oval side bars and mounting brackets':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%206%20IN%20OVAL%20SIDE%20BARS_MOUNTING%20BRACKETS%20App%20Guide.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%206%20IN%20OVAL%20SIDE%20BARS_MOUNTING%20BRACKETS%20App%20Guide.xlsx';
			case 'bull bars':
				if (type === 'pdf'){
					return 'http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Bull%20Bars.pdf';
				}
				return 'http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Bull%20Bars.xlsx';
			case 'floor liners':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Interiors_App_Guide.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Interiors_App_Guide.xlsx';
			case 'grille guards':
				if (type === 'pdf'){
					return 'http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Grille%20Guards.pdf';
				}
				return 'http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Grille%20Guards.xlsx';
			case 'jeep accessories':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Jeep%20Accessories.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Jeep%20Accessories.xlsx';
			case 'jeep bumper kits and replacement parts':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.xlsx';
			case '4 in round side bars, big step':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20BIG%20STEP%20SIDE%20BARS%20App%20Guide.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20BIG%20STEP%20SIDE%20BARS%20App%20Guide.xlsx';
			case '5 in running boards, aerotread':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/AeroTread%20Running%20Boards%20and%20Brackets.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/AeroTread%20Running%20Boards%20and%20Brackets.xlsx';
			case '5.5 in bull bars, advantedge':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/AdvantEDGE%20Bull%20Bars.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/AdvantEDGE%20Bull%20Bars.xlsx';
			case 'headache racks, advantedge':
				if (type === 'pdf'){
					return 'http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/AdvantEdge%20Headache%20Racks.pdf';
				}
				return 'http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/AdvantEdge%20Headache%20Racks.xlsx';
			case 'headache racks':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Headache%20Racks.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Headache%20Racks.xlsx';
			case '5.5 in side bars, advantedge':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/AdvantEdge%20Side%20Bar.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/AdvantEdge%20Side%20Bar.xlsx';
			case '6.5 in commercial running boards, ridgestep':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/RidgeStep%20Running%20Boards%20and%20Brackets.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/RidgeStep%20Running%20Boards%20and%20Brackets.xlsx';
			case 'jeep rocker steps':
				if (type === 'pdf'){
					return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Jeep%20Rocker%20Steps.pdf';
				}
				return 'https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Jeep%20Rocker%20Steps.xlsx';
			default:
				return '';
		}
	};

	var parseLocations = function(apps){
		var low = 0;
		var high = 0;
		var last = {};
		angular.forEach(apps, function(app){
			if(last.make !== app.make || last.model !== app.model ||
				last.style !== app.style || last.min_year !== app.min_year){
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

				for (var i = 0; i < app.parts.length; i++) {
					var ap = app.parts[i];
					var exists = false;
					for (var j = 0; j < last.parts.length; j++) {
						var lp = last.parts[j];
						if (ap.oldPartNumber === lp.oldPartNumber) {
							exists = true;
						}
					}

					if (!exists) {
						last.parts.push(ap);
					}
				}
			}else{
				last = {};
				high = 0;
				low = 0;
			}
		});
	};

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

}]).filter('no_quote', function(){
	return function(style){
		return style.replace(/'/, '-foot');
	}
})
