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

		it('should have 2 testimonials', function(){
			expect(element.all(by.css('.testimonial')).count()).toBe(2);
		});

		it('should have 5 featured products', function(){
			expect(element.all(by.css('.featuredProd')).count()).toBe(5);
		});
	});

});