var webdriver = require('selenium-webdriver');

describe('E2E: Testing Application Template', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/');
		browser.debugger();
	});

	describe('Home Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

		it('should have a primary heading', function(){
			expect(element(by.css('h1')).getText()).not.toEqual("");
		});

	});

});