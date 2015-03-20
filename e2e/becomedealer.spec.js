'use strict';

describe('Become A Dealer', function () {
  
  beforeEach(function () {
    browser.get('http://localhost:3000/becomedealer');
  });

  it('should have proper title text', function () {
    expect(browser.getTitle()).toEqual('Aries Automotive');
  });

  it('should have a primary heading', function(){
    expect(element(by.css('h1')).getText()).not.toEqual("");
  });
});
