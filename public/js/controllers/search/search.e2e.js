var webdriver = require('selenium-webdriver');

describe('E2E: Testing Search Page', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/search/bull bar');
		browser.debugger();
	});

	describe('Part Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

		// it('should have part number listed', function(){
		// 	expect(element(by.css('.partNumSmall')).getText()).not.toEqual("");
		// });

		// it('should have 5 featured products', function(){
		// 	expect(element.all(by.css('.featuredProd')).count()).toBe(5);
		// });
		
		// it('should have breadcrumbs', function(){
		// 	expect(element(by.css('.breadcrumb')).all(by.tagName("li")).count()).toBeGreaterThan(0);
		// });

		// it('should have a upc listed', function(){
		// 	expect(element(by.css('#upc')).getText()).not.toEqual("");
		// });

		// it('should have a h1 with a short description inside it', function(){
		// 	expect(element(by.css('.partShortDesc')).getText()).not.toEqual("");
		// });
	});

});