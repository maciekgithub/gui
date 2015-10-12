'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.campaign',
  'myApp.home',
  // 'myApp.view1',
  // 'myApp.view2',
  // 'myApp.version',
  'myApp.wizard'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}]).

controller('MainCtrl', function($scope, $location) {
  $scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) === path) {
      return 'active';
    } else {
      return '';
    }
  }
}).

factory('campaignService', function() {

  var campaign = {}

  function set(data) {
    campaign = data;
  }

  function get() {
    return campaign;
  }

  return {
    set: set,
    get: get
  }

}).

factory('isepApi', function() {

  var campaign = {}

  function set(data) {
    campaign = data;
  }

  function get() {
    return campaign;
  }

  return {
    set: set,
    get: get
  }

})
;
