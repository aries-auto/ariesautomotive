'use strict';

describe('Home page', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/');
  });

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
