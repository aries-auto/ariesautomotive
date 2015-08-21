'use strict';

angular.module('ariesautomotive').controller('MainController', ['$scope', 'TestimonialService', 'PartService', '$rootScope', function($scope, TestimonialService, PartService, $rootScope){
  $scope.testimonials = [];
  $scope.featuredProducts = [];

  $rootScope.pageTitle = "ARIES Automotive | Custom Truck, Jeep, and SUV Accessories | Main";
  $rootScope.pageDesc = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle.";
  $rootScope.pageKywds = "aries, automotive, truck, suv, jeep, accessories, custom";

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
