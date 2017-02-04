angular.module('starter.controllers')
.controller('slideCtrl', ["$scope",
function($scope){
  (function init(){
    $scope.vo = {
      target:10000,
      step:8136
    };
  })();
}])
