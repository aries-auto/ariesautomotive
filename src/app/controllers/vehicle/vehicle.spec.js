describe('VehicleController in app.index', function () {

	var scope, subject, httpBackend;
	

	beforeEach(function () {
		module('app',
					'app.constants',
					'app.vehicle',
					'ui.router',
					'ngSanitize');

		inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			subject = $controller('VehicleController', { $scope: scope});
		});
	});

});