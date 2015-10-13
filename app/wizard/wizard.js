'use strict';

angular.module('myApp.wizard', [])

.controller('WizardCtrl', ['$scope', '$location', '$http', 'campaignService', 'SerivceApi', function($scope, $location, $http, campaignService, SerivceApi) {
  alert('WizardCtrl');
  // focus on the first input element, i.e. campaign name
  angular.element('.campaignName').trigger('focus');
  // new campaign configuration
  var now = new Date();
  var nextWeek = new Date(now + (7 * 24 * 60 * 60 * 1000));
  nextWeek.setDate(now.getDate() + 7);
  nextWeek.setHours(23);
  nextWeek.setMinutes(59);
  nextWeek.setSeconds(59);
  nextWeek.setMilliseconds(0);
  $scope.campaign = {
    "name": "",
    "params": {
      "START_DATE": new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0), //year, month, day
      "END_DATE": new Date(nextWeek),
      "LA": "",
      "GLOBAL": false
    }
    // "service": {}
  };

  $scope.largeAccounts = [
    "101",
    "102",
    "103"
  ];

  // services - this will be loaded from the REST service
  $scope.services = undefined;
  $scope.selectedService = undefined;
  // isepApi.getServices().then(function(services) {
  //   $scope.services = services;
  // });
  $scope.services = SerivceApi.getServices();
  console.log($scope.services);
  var skarbonka = SerivceApi.get({ "path" : "Piggybank" }, function() {
    console.log(JSON.stringify(skarbonka));
  });
  // $scope.services = undefined;
  // alert(JSON.stringify(isepApi.getServices()));
  // isepApi.getServices().then(function(response) {
  //   alert(response);
  //   $scope.services = response.data.dtos;
  // });
  // alert('$scope.services=' + $scope.services);
  // $scope.services = undefined;
  // $http({
  //   method: 'GET',
  //   url: '/api/service/all'
  // }).then(function successCallback(response) {
  //   $scope.services = response.data.dtos;
  // }, function errorCallback(response) {
  //   alert('Wystąpił błąd podczas pobierania listy usług NAI. Szczegoły: ' + response.statusText);
  // });

  // operations of the selected service
  $scope.operations = [{
    "id": 121,
    "name": "ACTIVATION",
    "description": "Aktywacja usługi",
    "params": {}
  }, {
    "id": 122,
    "name": "DEACTIVATION",
    "description": "Dezaktywacja usługi",
    "params": {}
  }];
  $scope.fetchOperations = function() {
    var campaignService = {
      "id" : $scope.selectedService.id,
      "name" : $scope.selectedService.name,
      "description" : $scope.selectedService.description
    }
    var serviceName = $scope.selectedService.name;
    alert('Pobieram listę operacji w serwisie: ' + serviceName);

    var operations = SerivceApi.getOperations({name : serviceName});
    console.log(JSON.stringify(operations));

    $scope.campaign.service = campaignService;
    $scope.campaign.operations = $scope.operations;
  }

  $scope.selectedItem = {}
  $scope.discounts = [{
    "type": "Kwotowy"
  }, {
    "type": "Procentowy"
  }]

  // var campaign = $scope.campaign;
  // campaign.startDate = new Date();
  // campaign.endDate = new Date();
  // campaign.endDate.setDate(campaign.endDate.getDate() + 7);
  // campaign.endDate.setDate(campaign.endDate + 7);

  $scope.createCampaign = function() {
    // ...
    campaignService.set($scope.campaign);
    $location.path('/campaign').search({
      "id": "101"
    });
  }

  $scope.getPath = function() {
    return $location.path();
  }

}]);
