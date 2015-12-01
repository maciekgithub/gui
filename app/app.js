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
    .when('/campaign/:id', {
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
    // function that returns current path
  $scope.getPath = function() {
    return $location.path();
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
  return $resource('http://prospero/isep/api/service/:name', {}, {
    getServices: {
      method: 'GET',
      params: {
        "name": "all"
      },
      isArray: true,
      transformResponse: function(data, header) {
        //Getting string data in response
        var jsonData = JSON.parse(data); //or angular.fromJson(data)
        // console.log('JSON data: ' + JSON.stringify(jsonData));

        var services = [];
        angular.forEach(jsonData.dtos, function(item) {
          // console.log('Item: ' + JSON.stringify(item));
          // services.push({"id" : item.id, "name" : item.name, "description" : item.description, "parameters" : item.parameters});
          services.push({
            "id": item.id,
            "name": item.name,
            "description": item.description
          });
        });
        return services;
      },
      interceptor: {
        responseError: function(rejection) {
          alert('An error occurred while obtaining the list of ISeP NAI services. Reason: ' + rejection);
        }
      }
    },
    // invocation example: getOperations({'name' : 'Techniczna nazwa usługi'})
    getOperations: {
      url: 'http://prospero/isep/api/service/:name/operations',
      method: 'GET',
      isArray: true,
      transformResponse: function(data, header) {
        //Getting string data in response
        var jsonData = JSON.parse(data); //or angular.fromJson(data)
        // console.log('JSON data: ' + JSON.stringify(jsonData));

        var operations = [];
        angular.forEach(jsonData.dtos, function(item) {
          // console.log('Item: ' + JSON.stringify(item));
          // operations.push({"id" : item.id, "name" : item.name, "description" : item.description, "parameters" : item.parameters});
          operations.push({
            "id": item.id,
            "name": item.name,
            "description": item.description
          });
        });
        operations.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {   
            return 1;
          }
          return 0;
        });
        return operations;
      },
      interceptor: {
        responseError: function(rejection) {
          alert('An error occurred while getting the list of operations. Reason: ' + rejection);
        }
      }
    }
  });
}).

factory('OperationApi', function($resource) {
  return $resource('http://prospero/isep/api/operation/:name');
}).

factory('CampaignApi', function($resource) {
  return $resource('http://prospero/isep/api/campaign/:id');
});
