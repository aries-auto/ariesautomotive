define([
	'angular',
	'angular-mocks',
	'Source/app'
], function () {
	describe('AppGuidesController in app.index', function () {

		var scope, subject, httpBackend;
		var mockedAppGuides = [{
			"id":5,
			"url":"test.com",
			"websiteId":1,
			"fileType":"pdf",
			"category":{"id":0,"title":"General Aries Applicatons"},
			"icon":"www.curtmfg.com/assets/f70444af-54b2-4242-8eca-13dacd6e715c.png",
		},{
			"id":6,
			"url":"testagain.com",
			"websiteId":1,
			"fileType":"csv",
			"category":{"id":0,"title":"General Aries Applicatons"},
			"icon":"",
		}];
		var mockedCategories = [{}];


		beforeEach(function () {
			module('app',
						'app.constants',
						'app.services.applicationGuide',
						'app.appguides',
						'ui.router',
						'ngSanitize');

			inject(function ($rootScope, $controller, $httpBackend) {
				httpBackend = $httpBackend;
				scope = $rootScope.$new();
				subject = $controller('AppGuidesController', { $scope: scope});
			});
		});

		describe('check if controller is in its place', function () {
			it('should have loaded the applicationGuides', function () {
				expect(scope.applicationGuides).toBeDefined();
			});
		});

		describe('check if scope is also in its place', function () {
			it('should test scope to be defined', function () {
				expect(scope).toBeDefined();
				expect(typeof scope.applicationGuide).toBe(typeof {});
				expect(scope.applicationGuides).not.toBe(null);//TODO
			});
		});

		describe('check if scope is in its place after mocked HTTP requests', function () {
			it('should test scope to be equal to mocked data', function () {
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/applicationGuide/website/3?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedAppGuides);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/category/0?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCategories);
				httpBackend.flush();
				expect(scope.applicationGuides).toEqual(mockedAppGuides);
				expect(scope.applicationGuide).not.toBeNull;
			});
		});

	});
});