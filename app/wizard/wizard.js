'use strict';

angular.module('myApp.wizard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wizard', {
    templateUrl: 'wizard/wizard.html',
    controller: 'WizardCtrl'
  });
}])

.controller('WizardCtrl', ['$scope', '$location', function($scope, $location) {
  // focus on the first input element, i.e. campaign name
  angular.element('.campaignName').trigger('focus');
  // new campaign configuration
  $scope.campaign = {
    "startDate": new Date(),
    "endDate": new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)),
    "message": "Witaj",
    "la": "",
    "service": {
      "params": {},
      "operations": []
    }
  };

  $scope.largeAccounts = [
    "101",
    "102",
    "103"
  ];
  $scope.services = [
    {
      "id" : "101",
      "name" : "Skarbonka"
    },
    {
      "id" : "201",
      "name" : "Urodziny"
    },
    {
      "id" : "301",
      "name" : "Pakiet 1000 minut do wszystkich siecii"
    }
  ];
  // operations of the selected service
  $scope.operations = [
    {
      "id" : 121,
      "name" : "ACTIVATION",
      "description" : "Aktywacja usługi",
      "params" : []
    },
    {
      "id" : 122,
      "name" : "DEACTIVATION",
      "description" : "Dezaktywacja usługi",
      "params" : []
    }
  ];

  // var campaign = $scope.campaign;
  // campaign.startDate = new Date();
  // campaign.endDate = new Date();
  // campaign.endDate.setDate(campaign.endDate.getDate() + 7);
  // campaign.endDate.setDate(campaign.endDate + 7);

  $scope.createCampaign = function() {
    // ...
    $location.path('/campaign').search({"id" : "101"});
  }

  $scope.getPath = function() {
    return $location.path();
  }

}]);
