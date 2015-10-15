'use strict';

angular.module('myApp.home', [])

.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.operations = [{
    "id": 101,
    "name": "ACTICATION",
    "description": "Aktywacja usługi"
  }, {
    "id": 201,
    "name": "DEACTICATION",
    "description": "Dezaktywacja usługi"
  }, {
    "id": 301,
    "name": "MODIFICATION",
    "description": "Modyfikacja usługi"
  }, {
    "id": 401,
    "name": "NEXT_CYCLE",
    "description": "Odnowienie usługi"
  }];

  $scope.discounts = [{
    "type": "Kwotowy"
  }, {
    "type": "Procentowy"
  }];

}]);
