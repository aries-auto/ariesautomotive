'use strict';

angular.module('ariesautomotive').controller('AppController', ['$scope', '$rootScope', '$location','CategoryService', function($scope, $rootScope, $location, CategoryService){
  $scope.parentCats = [];
  $scope.search_term = '';
  CategoryService.GetParents().then(function(parentCats){
    $scope.parentCats = parentCats;
  });

  $rootScope.goTo = function(path){
      $location.path(path);
  };

  $scope.carousel_images = [{
    image: 'https://storage.googleapis.com/aries-website/hero-images/Ford_Bull_Bar.png',
    text: 'A NEW ERA OF BULL BARS IS HERE',
    button_text: 'VIEW BULL BARS',
    link: '/category/299'
  },{
    image:'https://storage.googleapis.com/aries-website/hero-images/Chevy_Grille_Guard.png',
    text: 'A NEW ERA OF GRILLE GUARDS IS HERE',
    button_text: 'VIEW PRO SERIES',
    link: '/category/296'
  },{
    image:'https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png',
    text: 'A NEW ERA OF BUMPERS IS HERE',
    button_text: 'VIEW BUMPERS',
    link: '/category/332'
  }];
}]);
