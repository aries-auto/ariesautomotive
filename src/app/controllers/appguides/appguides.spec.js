describe('AppGuidesController in app.index', function () {

	var scope, subject, httpBackend;
	var mockedAppGuides = [{
		"id":5,
		"url":"test.com",
		"website":{
			"id":3
		},
		"fileType":"pdf",
		"category":{"id":0,"title":"General Aries Applicatons"},
		"icon":"www.curtmfg.com/assets/f70444af-54b2-4242-8eca-13dacd6e715c.png",
	},{
		"id":6,
		"url":"testagain.com",
		"website":{
			"id":3
		},
		"fileType":"csv",
		"category":{"id":0,"title":"General Aries Applicatons"},
		"icon":"",
	}];
	var mockedCategories = [{}];


	beforeEach(function () {
		module('ariesautomotive',
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
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/applicationGuide/website/3?key=883d4046-8b96-11e4-9475-42010af00d4e').respond(mockedAppGuides);
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/category/0?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCategories);
			httpBackend.flush();
			expect(scope.applicationGuides).toEqual(mockedAppGuides);
			expect(scope.applicationGuide).not.toEqual(null);
		});
	});

});