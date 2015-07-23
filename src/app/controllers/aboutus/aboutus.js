'use strict';

angular.module('ariesautomotive').controller('AboutUsController', ['$rootScope', 'TitleService', function($rootScope, TitleService){

  var titleText = "About Us - Learn More About ARIES Automotive";
	$rootScope.titleservice = TitleService;
	$rootScope.titleservice.set(titleText);

}]);
