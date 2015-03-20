'use strict';

describe('Tech Support', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/techsupport');
  });

  it('should have proper title text', function () {
    expect(browser.getTitle()).toEqual('Aries Automotive');
  });
});
