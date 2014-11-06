var webdriver = require('selenium-webdriver');

describe('E2E: Testing Category Page', function () {
	"use strict";

	beforeEach(function () {
		browser.get('/category/304');
		browser.debugger();
	});

	describe('Category Page', function () {
		it('should have proper title text', function () {
			expect(browser.getTitle()).toEqual('Aries Automotive');
		});

		it('should have a category title', function(){
			expect(element(by.css('#catTitle')).getText()).not.toEqual("");
		});

		it('should have a cateogry parts listing title', function(){
			expect(element(by.css('#catTitleProds')).getText()).not.toEqual("");
		});

		it('should have at least 1 product', function(){
			expect(element.all(by.css('.product')).count()).toBeGreaterThan(1);
		});
		

	});

});