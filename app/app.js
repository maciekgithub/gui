'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngResource',
  'ngRoute',
  'myApp.campaign',
  'myApp.home',
  // 'myApp.view1',
  // 'myApp.view2',
  // 'myApp.version',
  'myApp.wizard'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
    })
    .when('/campaign', {
      templateUrl: 'campaign/campaign.html',
      controller: 'CampaignCtrl'
    })
    .when('/wizard', {
      templateUrl: 'wizard/wizard.html',
      controller: 'WizardCtrl'
    })
    .otherwise({
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

factory('SerivceApi', function($resource) {
  return $resource('api/service/:name', {}, {
    getServices: {
      method: 'GET',
      params: {"name" : "all"},
      isArray: true,
      transformResponse: function(data, header) {
        //Getting string data in response
        var jsonData = JSON.parse(data); //or angular.fromJson(data)
        console.log('JSON data: ' + JSON.stringify(jsonData));

        var services = [];
        angular.forEach(jsonData.dtos, function(item) {
          console.log('Item: ' + JSON.stringify(item));
          services.push(item);
        });
        return services;
      }
    },
    // invocation example: getOperations({'name' : 'Techniczna nazwa usługi'})
    getOperations: {
      url: 'api/service/:name/operations',
      method: 'GET',
      // params: {"name" : "@serviceName"},
      isArray: true,
      transformResponse: function(data, header) {
        //Getting string data in response
        var jsonData = JSON.parse(data); //or angular.fromJson(data)
        console.log('JSON data: ' + JSON.stringify(jsonData));

        var operations = [];
        angular.forEach(jsonData.dtos, function(item) {
          console.log('Item: ' + JSON.stringify(item));
          operations.push(item);
        });
        return operations;
      }
    }
  });
}).

factory('OperationApi', function($resource) {
  return $resource('api/operation/:path');
}).

factory('CampaignApi', function($resource) {
  return $resource('api/campaign/:id');
});
