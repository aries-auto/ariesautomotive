var webdriver = require('selenium-webdriver');

describe('E2E: Testing App Guides Page', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/appguides');
		browser.debugger();
	});

	describe('App Guides Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

		it('should have a primary heading', function(){
			expect(element(by.css('h1')).getText()).not.toEqual("");
		});

		it('should have atleast one App Guide Link', function(){
			expect(element.all(by.css('.appGuideLink')).count()).toBeGreaterThan(0);
		});


	});

});