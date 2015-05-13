'use strict';

angular.module('ariesautomotive').controller('MainController', ['$scope', 'TestimonialService', 'PartService' , function($scope, TestimonialService, PartService){
  $scope.testimonials = [];
  $scope.featuredProducts = [];

  TestimonialService.GetRandom({count: 2, randomize: true}).then(function(testimonials){
    $scope.testimonials = testimonials;
  });

  PartService.GetFeatured().then(function(featured){
    $scope.featuredProducts = featured;
  });

  $scope.carouselPrev = function(){
  	$('#hero-image-carousel').carousel('prev');
  };
  $scope.carouselNext = function(){
  	$('#hero-image-carousel').carousel('next');
  };
}]);