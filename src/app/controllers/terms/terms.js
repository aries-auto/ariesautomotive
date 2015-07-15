'use strict';

angular.module('ariesautomotive').controller('TermsController', ['$rootScope', 'TitleService', function($rootScope, TitleService){


  var titleText = "Terms and Conditions - Aries Automotive";
	$rootScope.titleservice = TitleService;
	$rootScope.titleservice.set(titleText);

}]);
