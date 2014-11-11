var webdriver = require('selenium-webdriver');

describe('E2E: Testing Become A Dealer Page', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/becomedealer');
		browser.debugger();
	});

	describe('Become a Dealer Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

		it('should have a primary heading', function(){
			expect(element(by.css('h1')).getText()).not.toEqual("");
		});

	});

});