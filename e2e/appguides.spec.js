'use strict';

describe('Application Guides', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/appguides');
  });

  it('should have proper title text', function () {
    expect(browser.getTitle()).toEqual('Aries Automotive');
  });

  it('should have a primary heading', function(){
    expect(element(by.css('h1')).getText()).not.toEqual("");
  });

  it('should have atleast one App Guide Link', function(){
    expect(element.all(by.css('.appGuideLink')).count()).toBeGreaterThan(0);
  });
});
