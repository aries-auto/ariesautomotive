describe('TermsController in app.index', function () {

	var scope, subject, httpBackend;
	

	beforeEach(function () {
		module('app',
					'app.constants',
					'app.terms',
					'ui.router',
					'ngSanitize');

		inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			subject = $controller('TermsController', { $scope: scope});
		});
	});

});