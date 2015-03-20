'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('ariesautomotive'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define more than 2 carousel images', inject(function($controller) {
    expect(scope.carousel_images).toBeUndefined();

    $controller('AppController', {
      $scope: scope
    });

    expect(angular.isArray(scope.carousel_images)).toBeTruthy();
    expect(scope.carousel_images.length > 2).toBeTruthy();
  }));
});
