'use strict';

angular.module('ariesautomotive', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap','LocalStorageModule'])
  .config(function ($stateProvider, $urlRouterProvider, $interpolateProvider, $locationProvider, localStorageServiceProvider) {
    var lookupState = {
      templateUrl: 'app/controllers/lookup/index.html',
      controller: 'LookupController'
    };
    $stateProvider
      .state('home', {
        url: '/',
        views:{
          'body':{
            templateUrl: 'app/controllers/main/index.html',
            controller: 'MainController'
          },
          'lookup':lookupState
        }
      })
      .state('aboutus',{
        url: '/about',
        views:{
          'body':{
            templateUrl: 'app/controllers/aboutus/index.html',
            controller: 'AboutUsController'
          },
          'lookup':lookupState
        }
      })
      .state('part',{
        url: '/part/:id',
        views:{
          'body':{
            templateUrl: 'app/controllers/part/index.html',
            controller: 'PartController'
          },
          'lookup': lookupState
        }
      }).state('category',{
        url: '/category/:id',
        views:{
          'body':{
            templateUrl: 'app/controllers/category/index.html',
            controller: 'CategoryController'
          },
          'lookup': lookupState
        }
      }).state('appguides',{
        url: '/appguides',
        views:{
          'body':{
            templateUrl: 'app/controllers/appguides/index.html',
            controller: 'AppGuidesController'
          },
          'lookup': lookupState
        }
      })
      .state('becomedealer',{
        url: '/becomedealer',
        views:{
          'body':{
            templateUrl: 'app/controllers/becomedealer/index.html',
            controller: 'BecomeDealerController'
          },
          'lookup': lookupState
        }
      }).state('contact',{
        url: '/contact',
        views:{
          'body':{
            templateUrl: 'app/controllers/contact/index.html',
            controller: 'ContactController'
          },
          'lookup': lookupState
        }
      }).state('search',{
        url: '/search/:term',
        views:{
          'body':{
            templateUrl: 'app/controllers/search/index.html',
            controller: 'SearchController'
          },
          'lookup': lookupState
        }
      }).state('techsupport',{
        url: '/techsupport',
        views:{
          'body':{
            templateUrl: 'app/controllers/techsupport/index.html',
            controller: 'TechSupportController'
          },
          'lookup': lookupState
        }
      }).state('terms',{
        url: '/terms',
        views:{
          'body':{
            templateUrl: 'app/controllers/terms/index.html',
            controller: 'TermsController'
          },
          'lookup': lookupState
        }
      }).state('full_vehicle',{
        url: '/vehicle/:year/:make/:model/:submodel/{configs:.*}',
        views:{
          'body':{
            templateUrl: 'app/controllers/vehicle/index.html',
            controller: 'VehicleController'
          },
          'lookup': lookupState
        }
      }).state('sub_vehicle',{
        url: '/vehicle/:year/:make/:model/:submodel',
        views:{
          'body':{
            templateUrl: 'app/controllers/vehicle/index.html',
            controller: 'VehicleController'
          },
          'lookup': lookupState
        }
      }).state('base_vehicle',{
        url: '/vehicle/:year/:make/:model',
        views:{
          'body':{
            templateUrl: 'app/controllers/vehicle/index.html',
            controller: 'VehicleController'
          },
          'lookup': lookupState
        }
      }).state('make_vehicle',{
        url: '/vehicle/:year/:make',
        views:{
          'body':{
            templateUrl: 'app/controllers/vehicle/index.html',
            controller: 'VehicleController'
          },
          'lookup': lookupState
        }
      }).state('year_vehicle',{
        url: '/vehicle/:year',
        views:{
          'body':{
            templateUrl: 'app/controllers/vehicle/index.html',
            controller: 'VehicleController'
          },
          'lookup': lookupState
        }
      }).state('empty_vehicle',{
        url: '/vehicle',
        views:{
          'body':{
            templateUrl: 'app/controllers/vehicle/index.html',
            controller: 'VehicleController'
          },
          'lookup': lookupState
        }
      }).state('warranties',{
        url: '/warranties',
        views:{
          'body':{
            templateUrl: '/js/controllers/warranties/index.html',
            controller: 'WarrantiesController'
          },
          'lookup': lookupState
        }
      });
    $urlRouterProvider.otherwise('/');
  	$interpolateProvider.startSymbol('[[');
  	$interpolateProvider.endSymbol(']]');
  	$locationProvider.html5Mode(true);
  	localStorageServiceProvider.setPrefix('localStorage').setPrefix('ariesauto');

});
