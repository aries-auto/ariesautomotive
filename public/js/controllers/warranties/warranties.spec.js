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
		var badWarranty = {
			"partNumber": 123,
			"date":"01/01/2001",
			"approved":true,
			"contactID":1
		};
		var undatedWarranty = {
			"partNumber": 11000,
			"date":null,
			"approved":true,
			"contactID":1
		};

		var mockedPart = {
			"id":11000,
			"status":800
		}

		var mockedBadPart = {
			"id":0,
			"status":0
		}

		var mockedCountryStates = [{
			"id":1,
			"name":"America",
			"abbr":"USA",
		},{
			"id":2,
			"name":"East Prussia",
			"abbr":"EP",
		}];

		var mockedStates = [{
			"id":1,
			"state":"Texas"
		}];

		var mockedWarrantyResponse = [{
			"id":1,
			"firstName":"Jim"
		}];

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
			it('should have loaded the subject', function () {
				expect(subject).toBeDefined();
			});
		});
		describe('check if scope is also in its place', function () {
			it('should test scope to be defined', function () {
				expect(scope).toBeDefined();
				expect(typeof scope.warranty).toBe(typeof {});
				expect(scope.matchPart).not.toBe(null);//TODO
			});
		});

		describe('Check if scope is in its place after mocked HTTP requests. ', function () {
			it('Countrystates and warranty/partConfirm should be populated. ', function () {
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCountryStates);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/warranty/6/false?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedWarrantyResponse);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/part/11000?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedPart);

				httpBackend.flush();
				expect(scope.countrystates).toEqual(mockedCountryStates);

				scope.matchPart(warranty);
				httpBackend.flush();
				expect(scope.warranty.partNumber).toBeDefined();
				expect(scope.warranty.partNumber).toEqual(11000);
				expect(scope.partConfirm).toEqual(true);
			
			});
			it('Warranty/partConfirm should contain bad data. ', function () {
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/part/old/123?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedBadPart);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCountryStates);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/part/123?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedBadPart);

				scope.matchPart(badWarranty);
				httpBackend.flush();
				expect(scope.warranty.oldPartNumber).toBeUndefined();
				expect(scope.partConfirm).toEqual(false);
			});
		});

		describe('check states',function(){
			it('should populate countries',function(){
				expect(scope.countryStates).toBeDefined;
			});
		});
		describe('submit warranty',function(){
			it('should generate a positive response',function(){
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCountryStates);
				httpBackend.when('POST','http://ariesautoapi.curtmfg.com/warranty/6/false?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedWarrantyResponse);

				scope.submitWarranty(warranty);
		
				httpBackend.flush();
				expect(warranty.date).toNotBeNull;
				expect(scope.dateMessage).toBeEmpty;
				expect(scope.message).toBe("Request sent.");
				expect(scope.warranty).toBeEmpty;
			});
			it('should generate a negative response',function(){
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCountryStates);
				
				scope.submitWarranty(undatedWarranty);
		
				httpBackend.flush();
				expect(scope.warranty.date).toBeNull;
				expect(scope.dateMessage).toEqual("This field cannot be empty.");
				expect(scope.message).toBe("Click this button:");
			});
		});

	});
});