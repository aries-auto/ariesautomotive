var webdriver = require('selenium-webdriver');

describe('E2E: Testing About Us Page', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/about');
		browser.debugger();
	});

	describe('About Us Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

		it('should have a primary heading', function(){
			expect(element(by.css('h1')).getText()).not.toEqual("");
		});

	});

});