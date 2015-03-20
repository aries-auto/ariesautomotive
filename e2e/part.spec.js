'use strict';

describe('Part', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/part/1042');
  });

  it('should have proper title text', function () {
    expect(browser.getTitle()).toEqual('Aries Automotive');
  });

  it('should have part number listed', function(){
    expect(element(by.css('.col-md-6 .part-num .small')).getText()).not.toEqual('');
  });

  it('should have 5 featured products', function(){
    expect(element.all(by.css('.featuredProd')).count()).toBe(5);
  });
  
  it('should have breadcrumbs', function(){
    var cnt = element.all(by.css('.hidden-xs .breadcrumb')).get(0).all(by.tagName('li')).count();
    expect(cnt).toBeGreaterThan(0);
    // expect(element(by.css('.hidden-xs .breadcrumb').get(0)).all(by.tagName('li')).count()).toBeGreaterThan(0);
  });

  it('should have a h1 with a short description inside it', function(){
    expect(element(by.css('.hidden-xs h1')).getText()).not.toEqual('');
  });
});
