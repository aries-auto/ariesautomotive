'use strict';

angular.module('ariesautomotive').controller('MainController', ['$scope', 'TestimonialService', 'PartService', '$rootScope', 'Lightbox', '$sce', function($scope, TestimonialService, PartService, $rootScope, Lightbox, $sce){
  $scope.testimonials = [];
  $scope.featuredProducts = [];
  $scope.catalogs = [
      {
          title: '2016 Exterior Catalog',
          image: 'https://storage.googleapis.com/aries-website/ARIES-Exterior-Cover.png',
          link: 'https://storage.googleapis.com/aries-website/2016-Exterior-Catalog.pdf',
      },
      {
          title: '2016 Interior Catalog',
          image: 'https://storage.googleapis.com/aries-website/ARIES-Interior-Cover.png',
          link: 'https://storage.googleapis.com/aries-website/2016-Interior-Catalog.pdf',
      },
      {
          title: '2016 Jeep Catalog',
          image: 'https://storage.googleapis.com/aries-website/ARIES-Jeep-Cover.png',
          link: 'https://storage.googleapis.com/aries-website/_2016%20ARIES%20Jeep%20Catalog-SFS.pdf',
      }
  ];

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

  $scope.whatsNewContent = [
  {
    'type':'video',
    'url': 'https://www.youtube.com/v/8GzILyP_2BM',
    'thumbUrl': 'https://i.ytimg.com/vi/8GzILyP_2BM/1.jpg'
  }];

  $scope.showWhatsNewLightbox = function(){
    for (var i = 0; i < $scope.whatsNewContent.length; i++){
      if (typeof($scope.whatsNewContent[i].url) === 'string'){
        $scope.whatsNewContent[i].url = $sce.trustAsResourceUrl($scope.whatsNewContent[i].url);
      }
    }
    Lightbox.openModal($scope.whatsNewContent, 0);
  };

}]);
