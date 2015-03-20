'use strict';

describe('Warranties', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/warranties');
  });

  it('should have proper title text', function () {
    expect(browser.getTitle()).toEqual('Aries Automotive');
  });

  it('should have a drop down with multiple countries', function(){
  	var cnt = element(by.id('country')).all(by.tagName('option')).count();
  	expect(cnt).toBeGreaterThan(1);
  });
});
