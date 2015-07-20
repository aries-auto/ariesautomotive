'use strict';

angular.module('ariesautomotive').factory('TitleService', function(){
var title = "";
return {
 set: function(newTitle) {
   title = newTitle;
 },
 getTitle: function() { return title; }
}
});
