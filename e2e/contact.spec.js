'use strict';

describe('Contact', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/contact');
  });

  it('should have proper title text', function () {
    expect(browser.getTitle()).toEqual('Aries Automotive');
  });

  it('should have a drop down with multiple contact types', function(){
    expect(element(by.css('#contact_type')).all(by.tagName("option")).count()).toBeGreaterThan(1);
  });
});
