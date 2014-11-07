var webdriver = require('selenium-webdriver');

describe('E2E: Testing Warranty Page', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/warranties');
		browser.debugger();
	});

	describe('Warranty Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

		it('should have a drop down with multiple contact types', function(){
			expect(element(by.css('#country')).all(by.tagName("option")).count()).toBeGreaterThan(1);
		});	

	});

});