'use strict';

angular.module('myApp.wizard', [])

.controller('WizardCtrl', ['$scope', '$location', '$http', 'campaignService', 'SerivceApi', function($scope, $location, $http, campaignService, SerivceApi) {
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
      "START_DATE": new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0),
      "END_DATE": new Date(nextWeek),
      // "END_DATE": new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), nextWeek.getHours(), nextWeek.getMinutes(), nextWeek.getSeconds(), nextWeek.getMilliseconds()),
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

  // $scope.services holds a list of ISeP NAI services - it os loaded from the REST service via the ServiceApi factory
  $scope.services = SerivceApi.getServices();
  // holds the service selected by the user
  $scope.selectedService = undefined;
  // function that refreshes the list of ISeP NAI services using the SerivceApi factory
  $scope.refreshServices = function() {
    $scope.services = SerivceApi.getServices();
  };
  // function that fetches the list of operations in the selected service
  $scope.fetchOperations = function() {
    var serviceName = $scope.selectedService.name;
    console.log('Pobieram listę operacji w serwisie: ' + serviceName);
    var operations = SerivceApi.getOperations({name : serviceName});
    console.log(JSON.stringify(operations));

    $scope.campaign.service = $scope.selectedService;
    $scope.operations = operations;
  }
  $scope.operationFilter = function(operation) {
    var name = operation.name;
    if (name.indexOf('DEACTIVATION') > -1) {
      return false;
    }
    return name.indexOf('ACTIVATION') > -1 || name.indexOf('MODIFICATION') > -1 || name.indexOf('NEXT_CYCLE') > -1;
  };
  $scope.addDiscount = function(operation) {
    console.log('Adding discount for ' + JSON.stringify(operation));
    if (typeof $scope.campaign.operations === 'undefined') {
      $scope.campaign.operations = [];
    }
    operation.params = {};
    operation.params['DISCOUNT'] = {};
    $scope.campaign.operations.push(operation);
  }
  $scope.removeDiscount = function(operation) {
    var index = $.inArray(operation, $scope.campaign.operations);
    if (index < 0) {
      return;
    }
    console.log('Operations: ' + $scope.campaign.operations);
    console.log('Operations: ' + JSON.stringify($scope.campaign.operations));

    $scope.campaign.operations = $.grep($scope.campaign.operations, function(value) {
      return value != operation;
    });
    
    if ($scope.campaign.operations.length === 0) {
      $scope.campaign.operations = undefined;
    }
    operation.params = undefined;
  }
  // resets discount for an operation when discount type is changed
  $scope.resetDiscount = function(operation) {
    var discount = operation.params['DISCOUNT'];
    discount.amount = undefined;
    discount.validity = undefined;
    discount.recurrence = undefined;
  }
  
  $scope.showAddDiscountBtn = function(operation) {
    return $.inArray(operation, $scope.campaign.operations) === -1;
  }
  $scope.maxDiscountValue = function(operation) {
    return operation.params['DISCOUNT'].type=='PriceOverride' ? 200 : 100;
  }
  $scope.discountAddon = function(operation) {
    return operation.params['DISCOUNT'].type=='PriceOverride' ? 'zł' : '%';
  }

  $scope.discounts = [{
    "type": "PriceOverride",
    "label": "Napisanie ceny"
  }, {
    "type": "PricePercentage",
    "label": "Procent ceny"
  }]

  // var campaign = $scope.campaign;
  // campaign.startDate = new Date();
  // campaign.endDate = new Date();
  // campaign.endDate.setDate(campaign.endDate.getDate() + 7);
  // campaign.endDate.setDate(campaign.endDate + 7);

  $scope.createCampaign = function() {
    // ...
    campaignService.set($scope.campaign);
    $location.path('/campaign/101');
  }

}]);
