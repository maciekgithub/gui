'use strict';

angular.module('myApp.wizard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wizard', {
    templateUrl: 'wizard/wizard.html',
    controller: 'WizardCtrl',
    tab: 'wizard'
  });
}])

.controller('WizardCtrl', function($scope) {
  $scope.campaign = {};
  var campaign = $scope.campaign;
  campaign.startDate = new Date();
  campaign.endDate = new Date();
  campaign.endDate.setDate(campaign.endDate.getDate() + 7); 
  // campaign.endDate.setDate(campaign.endDate + 7); 
});
