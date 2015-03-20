'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('ariesautomotive'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define scope', inject(function($controller) {

    $controller('AboutUsController', {
      $scope: scope
    });

  }));
});