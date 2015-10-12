'use strict';

angular.module('myApp.campaign', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/campaign', {
    templateUrl: 'campaign/campaign.html',
    controller: 'CampaignCtrl'
  });
}])

.controller('CampaignCtrl', ['$scope', '$location', 'campaignService', function($scope, $location, campaignService) {
  // focus on the first input element, i.e. campaign name
  angular.element('.campaignName').trigger('focus');
  // new campaign configuration
  // $scope.campaign = {
  //   "id" : $location.search().id,
  //   "name" : "Testowa",
  //   "startDate" : new Date(),
  //   "endDate" : new Date(new Date().getTime()+(7*24*60*60*1000)),
  //   "message" : "Witaj",
  //   "la" : "101",
  //   "service" : {
  //     "params" : {}
  //   }
  // };
  $scope.campaignId = $location.search().id;
  $scope.campaign = campaignService.get();
}]);
