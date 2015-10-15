'use strict';

angular.module('myApp.campaign', [])

.controller('CampaignCtrl', ['$scope', '$routeParams', 'campaignService', function($scope, $routeParams, campaignService) {
  // fetch campaign id from id route parameter
  $scope.campaignId = $routeParams.id;
  // lookup campaign with that id
  $scope.campaign = campaignService.get();
  // focus on the first input element, i.e. campaign name
  angular.element('.campaignName').trigger('focus');
}]);
