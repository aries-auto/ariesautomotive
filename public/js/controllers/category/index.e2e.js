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

		it('should have a part title in a part listing', function(){
			expect(element.all(by.css('.product')).get(0).element(by.css('.product-desc')).getText()).not.toEqual("");
		});	
		
		it('load more should load more products', function(){
			var defaultPartCount = element.all(by.css('.product')).count();
			element(by.css('.pagination')).click();
			// load more pages of parts, length should be greater than it was at first.
			expect(element.all(by.css('.product')).count()).toBeGreaterThan(defaultPartCount);
		});

	});

});