'use strict';

angular.module('ariesautomotive').controller('ContactController', ['$scope', 'ContactService', 'BecomeDealerService', 'GeographyService', '$rootScope',
	function($scope, ContactService, BecomeDealerService, GeographyService, $rootScope) {
		$scope.formData = {
			'sendEmail': true
		};
		$scope.saving = false;

		$rootScope.pageTitle = 'ARIES Automotive | Contact Us';
		$rootScope.pageDesc = 'Finding grille guards, bull bars, side bars and other ARIES parts for your vehicle is easy using the ARIES product search bar and part lookup tool.';
		$rootScope.pageKywds = 'aries, automotive, product search';

		$scope.postForm = function() {
			$scope.errorMessage = '';
			$scope.successMessage = '';
			$scope.saving = true;
			ContactService.PostContactData(JSON.stringify($scope.formData), $scope.formData.type).then(function(resp) {
				if (resp.id > 0) {
					$scope.formData = {
						'sendEmail': true
					};
					$scope.successMessage = 'Thank you. We have received your request.\n';
				}
				$scope.saving = false;
			}, function() {
				$scope.errorMessage = 'Uh Oh! An error occurred while processing your request.\n';
				$scope.saving = false;
			});
		};

		ContactService.GetContactTypes().then(function(types) {
			$scope.contactTypes = types;
		});

		BecomeDealerService.GetBusinessClasses().then(function(classes) {
			$scope.businessClasses = classes;
		});

		GeographyService.GetCountryStates().then(function(countries) {
			$scope.countries = countries;
		});
	}
]);
