var webdriver = require('selenium-webdriver');

describe('E2E: Testing App', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/');
		browser.debugger();
	});

	describe('Home page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});
	});

});