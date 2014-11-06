var webdriver = require('selenium-webdriver');

describe('E2E: Testing Part Page', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/part/2220043');
		browser.debugger();
	});

	describe('Part Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

		it('should have part number listed', function(){
			expect(element(by.css('.partNumSmall')).getText()).not.toEqual("");
		});
	});

});