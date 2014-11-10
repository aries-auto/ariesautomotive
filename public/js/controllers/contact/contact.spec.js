define([
	'angular',
	'angular-mocks',
	'Source/app'
], function () {
	describe('ContactController in app.index', function () {

		var scope, subject, httpBackend;

		var mockedContactTypes = [{
			"id":1,
			"name":"Bart",
			"showOnWebsite":true
		},{
			"id":2,
			"name":"Homer",
			"showOnWebsite":false
		}];

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

		var resp = {
			"id":1
		};

		var mockForm = {
			"name":"Test",
			"contactType":1
		}
		

		beforeEach(function () {
			module('app',
						'app.constants',
						'app.services.contact',
						'app.contact',
						'ui.router',
						'ngSanitize');

			inject(function ($rootScope, $controller, $httpBackend) {
				httpBackend = $httpBackend;
				scope = $rootScope.$new();
				subject = $controller('ContactController', { $scope: scope});
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
				expect(typeof scope.formData).toBe(typeof {});
				expect(scope.contactTypes).not.toBe(null);//TODO
			});
		});

		describe('Check http calls. ',function(){
			it('should populate models',function(){
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/contact/types?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedContactTypes);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/new/dealers/business/classes?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedBusinessClasses);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCountryStates);
				
				httpBackend.flush();
				expect(scope.contactTypes).not.toBeEmpty;
				expect(scope.contactTypes.length).toEqual(2);
				expect(scope.businessClasses).toEqual(mockedBusinessClasses);
				expect(scope.countries).toEqual(mockedCountryStates);

			});
		});

		describe('Check postForm. ',function(){
			it('form should submit.',function(){
			 	httpBackend.when('GET','http://ariesautoapi.curtmfg.com/contact/types?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedContactTypes);
			 	httpBackend.when('GET','http://ariesautoapi.curtmfg.com/new/dealers/business/classes?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedBusinessClasses);
				httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedCountryStates);
				httpBackend.when('POST','http://ariesautoapi.curtmfg.com/contact/1?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(resp);
				
				httpBackend.flush();

				scope.formData = mockForm;
				scope.postForm(scope.formData,1);
	
				expect(scope.formData).not.toBeEmpty;
				// expect(scope.successMessage).toEqual('Thank you. We have received your request.\n');//TODO
				expect(resp.id).toEqual(1);

			});
		});

		// 	it('should NOT populate contactReceivers',function(){
		// 		httpBackend.when('GET','http://ariesautoapi.curtmfg.com/contact/types/receivers/11?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond(mockedContactReceivers);
		// 		httpBackend.when('POST','http://ariesautoapi.curtmfg.com/techSupport/11/true?key=eef1922f-2cba-11e4-8758-42010af0fd79').respond();
		// 		scope.submitTechSupport(badTechSupport);
		// 		httpBackend.flush();

		// 		expect(scope.message).toBeEmpty;
		// 		expect(scope.dateMessage).toEqual("This field cannot be empty");
		// 	});
		// });

		

	});
});