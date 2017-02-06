angular.module('starter.controllers').controller('stepCtrl', ['$scope', '$state', '$ionicHistory',
    function($scope, $state, $ionicHistory){
        (function init(){
            $scope.vo = {};
            $scope.vc = {};
        })();
        $scope.vc.toToday = function(){
            if($state.current.name.indexOf('today') < 0){
                $state.go('app.step.today');
                // history.go(-1);
                // $state.go('-1');
            }
        };
        $scope.vc.toTotal = function(){
            $state.go('app.step.total');
        };
        $scope.vc.hasToday = function(){
            return $state.current.name.indexOf('today') != -1;
        };
        (function initProcess(){
            $state.go('app.step.today');
        })();
    }
])
