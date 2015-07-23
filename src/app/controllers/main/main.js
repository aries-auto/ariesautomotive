'use strict';

angular.module('ariesautomotive').controller('MainController', ['$scope', 'TestimonialService', 'PartService', '$rootScope', 'TitleService', function($scope, TestimonialService, PartService, $rootScope, TitleService){
  $scope.testimonials = [];
  $scope.featuredProducts = [];

  var titleText = "ARIES Automotive - The Best in Truck and Jeep Accessories";
  $rootScope.titleservice = TitleService;
  $rootScope.titleservice.set(titleText);

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
