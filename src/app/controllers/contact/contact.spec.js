describe('ContactController', function () {

	var scope, subject, httpBackend;
	var api_key = '883d4046-8b96-11e4-9475-42010af00d4e';

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
		"type":1,
		"name":"Test",
		"contactType":1
	}
	

	beforeEach(function () {
		module('ariesautomotive',
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
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/contact/types?key='+api_key).respond(mockedContactTypes);
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/dealers/business/classes?key='+api_key).respond(mockedBusinessClasses);
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key='+api_key).respond(mockedCountryStates);
			
			httpBackend.flush();
			expect(scope.contactTypes).not.toBeEmpty;
			expect(scope.contactTypes.length).toEqual(2);
			expect(scope.businessClasses).toEqual(mockedBusinessClasses);
			expect(scope.countries).toEqual(mockedCountryStates);

		});
	});

	describe('Check postForm. ',function(){
		it('form should submit.',function(){
		 	httpBackend.when('GET','http://ariesautoapi.curtmfg.com/contact/types?key='+api_key).respond(mockedContactTypes);
		 	httpBackend.when('GET','http://ariesautoapi.curtmfg.com/dealers/business/classes?key='+api_key).respond(mockedBusinessClasses);
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/geography/countrystates?key='+api_key).respond(mockedCountryStates);
			httpBackend.expectPOST('http://ariesautoapi.curtmfg.com/contact/1?key='+api_key).respond(resp);

			scope.formData = mockForm;
			scope.postForm();
			httpBackend.flush();

			expect(scope.formData).not.toBeEmpty;
			expect(scope.successMessage).toEqual('Thank you. We have received your request.\n');//TODO
			expect(scope.errorMessage).toBeNull;

		});
	});

	

});