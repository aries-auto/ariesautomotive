'use strict';

angular.module('ariesautomotive').controller('AppGuidesController', ['$rootScope','$scope', 'LookupService', function($rootScope, $scope, LookupService){
	$scope.collections = [];

	$rootScope.pageTitle = "ARIES Automotive | Application Guides";
	$rootScope.pageKywds = "aries, automotive, applications, application guides, vehicles";


	LookupService.collections().then(function(data){
		$scope.collections = data;
	});

	$scope.GetFileLocation = function(col, type){
		var pdf = "";
		var xlsx = "";
		switch(col) {
			case "3 in round side bars":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20SIDE%20BARS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20SIDE%20BARS%20App%20Guide.xlsx";
				}
			case "3 in round side bars, pro series":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20PRO%20SERIES%20SIDE%20BARS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20PRO%20SERIES%20SIDE%20BARS%20App%20Guide.xlsx";
				}
			case "4 in oval side bars":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20App%20Guide.xlsx";
				}
			case "4 in oval side bars, wheel to wheel":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20-%20W2W%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20-%20W2W%20App%20Guide.xlsx";
				}
			case "6 in oval side bars and mounting brackets":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%206%20IN%20OVAL%20SIDE%20BARS_MOUNTING%20BRACKETS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%206%20IN%20OVAL%20SIDE%20BARS_MOUNTING%20BRACKETS%20App%20Guide.xlsx";
				}
			case "bull bars":
				if (type == "pdf"){
					return "http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Bull%20Bars.pdf";
				}else{
					return "http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Bull%20Bars.xlsx";
				}
			case "floor liners":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Interiors_App_Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Interiors_App_Guide.xlsx";
				}
			case "grille guards":
				if (type == "pdf"){
					return "http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Grille%20Guards.pdf";
				}else{
					return "http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Grille%20Guards.xlsx";
				}
			case "jeep accessories":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.xlsx";
				}
			case "jeep bumper kits and replacement parts":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.xlsx";
				}
			case "4 in round side bars, big step":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20BIG%20STEP%20SIDE%20BARS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20BIG%20STEP%20SIDE%20BARS%20App%20Guide.xlsx";
				}
			default:
				return "";
		}
	};


}]);
