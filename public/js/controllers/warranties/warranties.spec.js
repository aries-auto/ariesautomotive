define([
	'angular',
	'angular-mocks',
	'Source/app'
], function () {
	describe('WarrantiesController in app.index', function () {

		var scope, subject, httpBackend;
		var warranty = {
			"partNumber":11000,
			"date":"01/01/2001",
			"serialNumber":"101",
			"approved":true,
			"contactID":1
		};

		var mockedCountryStates = [{
			"id":1,
			"name":"America",
			"abbr":"USA",
		},{
			"id":2,
			"name":"East Prussia",
			"abbr":"EP",
		}];
		var mockedPartNumber = {};
		var mockedMatchedPart = [{}];

		beforeEach(function () {
			module('app',
						'app.constants',
						'app.services.warranties',
						'app.warranties',
						'ui.router',
						'ngSanitize');

			inject(function ($rootScope, $controller, $httpBackend) {
				httpBackend = $httpBackend;
				scope = $rootScope.$new();
				subject = $controller('WarrantiesController', { $scope: scope});
			});
		});

		describe('check if controller is in its place', function () {
			it('should have loaded the scope', function () {
				beforeEach(function(){
					scope.matchPart(warranty);
				});
				expect(warranty.partNumber).toEqual(11000);
				expect(scope.parConfirm).toBeTrue;
			});
		});

		describe('check if scope is also in its place', function () {
			it('should test scope to be defined', function () {
				expect(scope).toBeDefined();
				expect(typeof scope.warranty).toBe(typeof {});
				expect(scope.matchPart).not.toBe(null);//TODO
			});
		});

		describe('check if scope is in its place after mocked HTTP requests', function () {
			it('should test scope to be equal to mocked data', function () {
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com//part/old/11000?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedPartNumber);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCountryStates);
				httpBackend.flush();
				expect(scope.countrystates).toEqual(mockedCountryStates);
			});
		});
		// describe('check states',function(){
		// 	beforeEach(function(){
		// 		scope.updateStates()
		// 	});
		// 	expect(scope.warranty.contact.state).toBeDefined;
		// });

	});
});