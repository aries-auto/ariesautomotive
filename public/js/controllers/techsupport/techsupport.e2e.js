var webdriver = require('selenium-webdriver');

describe('E2E: Testing Tech Support Page', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/techsupport');
		browser.debugger();
	});

	describe('Tech Support Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

	});

});