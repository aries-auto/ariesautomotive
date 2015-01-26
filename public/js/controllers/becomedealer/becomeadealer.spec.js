define([
	'angular',
	'angular-mocks',
	'Source/app'
], function () {
	describe('BecomeDealerController in app.index', function () {

		var scope, subject, httpBackend;

		var mockedBusinessClasses = [{
			"id":1,
			"name":"Ford",
			"sort":1,
			"showOnWebsite":true
		}];

		var mockedCountryStates = [{
			"id":1,
			"name":"America",
			"abbr":"USA",
		},{
			"id":2,
			"name":"East Prussia",
			"abbr":"EP",
		}];

		var mockDealer = {
			"firstName":"Ted",
			"lastName":"Bundy",
			"email":"ted@ohno.com",
			"subject":"test"
		}




		beforeEach(function () {
			module('app',
						'app.constants',
						'app.services.becomedealer',
						'app.becomedealer',
						'ui.router',
						'ngSanitize');

			inject(function ($rootScope, $controller, $httpBackend) {
				httpBackend = $httpBackend;
				scope = $rootScope.$new();
				subject = $controller('BecomeDealerController', { $scope: scope});
			});
		});

		describe('check if controller is in its place', function () {
			it('should have loaded the subject', function () {
				expect(subject).toBeDefined();
			});
		});

		describe('Check if scope is also in its place. ', function () {
			it('should test scope to be defined', function () {
				expect(scope).toBeDefined();
				expect(typeof scope.contact).toBe(typeof {});
				// expect(scope.contactTypes).not.toBe(null);//TODO
			});
		});

		describe('Check http calls. ',function(){
			it('should populate models',function(){
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/new/dealers/business/classes?key=883d4046-8b96-11e4-9475-42010af00d4e').respond(mockedBusinessClasses);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key=883d4046-8b96-11e4-9475-42010af00d4e').respond(mockedCountryStates);

				httpBackend.flush();

				expect(scope.businessClasses).toEqual(mockedBusinessClasses);
				expect(scope.countries).toEqual(mockedCountryStates);
				expect(scope.countries.length).toEqual(2);

			});
		});

		describe('Check postForm. ',function(){
			it('form should submit.',function(){
			 	httpBackend.when('GET','http://ariesautoapi.curtmfg.com/new/dealers/business/classes?key= 883d4046-8b96-11e4-9475-42010af00d4e').respond(mockedBusinessClasses);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key= 883d4046-8b96-11e4-9475-42010af00d4e').respond(mockedCountryStates);
				httpBackend.expectPOST('http://ariesautoapi.curtmfg.com/contact/15?key= 883d4046-8b96-11e4-9475-42010af00d4e').respond(mockDealer);

				scope.contact = mockDealer;
				scope.saveDealer(scope.contact);
				httpBackend.flush();

				expect(scope.message).toEqual('Request sent.');
			});
		});



	});
});