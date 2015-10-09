'use strict';

// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('activator', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  // route to new campaign wizard (/wizard)
  .state('wizard', {
    url: '/wizard',
    templateUrl: 'wizard.html',
    controller: 'wizardController'
  })
  // nested states 
  // each of these sections will have their own view
  // url will be nested (/wizard/start)
  .state('wizard.start', {
    url: '/start',
    templateUrl: 'wizard-start.html'
  })
  // url will be /wizard/discount
  .state('wizard.discount', {
    url: '/discount',
    templateUrl: 'wizard-discount.html'
  })

  // url will be /wizard/finish
  .state('wizard.finish', {
    url: '/finish',
    templateUrl: 'wizard-finish.html'
  });

  // catch all route
  // send users to the form page 
  $urlRouterProvider.otherwise('/wizard/start');
})

// our controller for the form
// =============================================================================
.controller('wizardController', function($scope) {

  // we will store all of our form data in this object
  $scope.campaign = {};

  // function to process the form
  $scope.processForm = function() {
    alert('awesome!');
  };

});
