angular.module('starter.controllers')
.controller('stepsCtrl', ["$scope",
  function($scope){
    (function init(){
      $scope.vo = {};
      $scope.vc = {};
    })();
    function getTodayStepSuc(data){
      $scope.vo.todayStep = data;
      $scope.$apply();
    };
    function getTodayStepFail(error){
      console.log('getTodayStepFail', error);
      $scope.vo.message = error.message;
      $scope.$apply();
    };
    $scope.vc.getSteps = function(){
      if(typeof(Steps) !== 'undefined'){
        Steps.getRecent(function(data){
          console.log(data);
          $scope.vo.stepEntries = data;
          makeCharts();
          $scope.$apply();
        },
        function(error){
          console.log(error);
          $scope.vo.message = error.message;
          $scope.$apply();
        },
        {days:7});
      } else {
        var json = '[{"date":"2017-01-13","step":"3819"},{"date":"2017-01-12","step":"7259"},{"date":"2017-01-11","step":"7716"},{"date":"2017-01-10","step":"6846"},{"date":"2017-01-09","step":"8778"},{"date":"2017-01-08","step":"7822"},{"date":"2017-01-07","step":"1418"}]';
        $scope.vo.stepEntries = angular.fromJson(json);
        makeCharts();
      }
    };
    $scope.vc.register = function(){
      if(typeof(Steps) !== 'undefined'){
        Steps.register(getTodayStepSuc, getTodayStepFail);
      }
    }
    $scope.vc.unregister = function(){
      if(!$scope.vo.todayStep){
        return;
      }
      delete($scope.vo.todayStep);
      if(typeof(Steps) !== 'undefined'){
        Steps.unregister();
      }
    }

    //用eCharts画折线图
    function makeCharts(){
      var days = [], steps = [];
      angular.forEach($scope.vo.stepEntries, function(item, index){
        days.unshift(item.date.substring(5,10));
        steps.unshift(item.step);
      })
      $scope.vo.options = {
        title : {
            text: '周视图',
            padding: 15
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['步数']
        },
        calculable : false,
        grid:{
          // x : 45
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : days,
                axisLine : {
                  show : true
                },
                axisLabel : {
                  interval : 0,
                  rotate : -45
                },
                axisTick : {
                  show : false
                },
                splitLine : {
                  show : true,
                  lineStyle : {
                    type : 'dashed'
                  }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitNumber : null,
                axisLine : {
                  show : false
                },
                axisLabel : {
                    show : false,
                    formatter: function(value){
                      return value / 1000 + 'k';
                    }
                },
                splitLine : {
                  show : false
                }
            }
        ],
        series : [
            {
                name:'步数',
                type:'line',
                data:steps,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                },
                itemStyle:{
                  normal:{
                    label:{
                      show:true
                    }
                  }
                }
            }
        ]
      };
      // $scope.$apply();
    };
  }])
  .filter('distance', function(){
    function f(num,n){
      return parseInt(num*Math.pow(10,n)+0.5,10)/Math.pow(10,n);
    }
    return function(step){
      var dis = step * 0.6;
      if(dis < 500){
        return dis + '米';
      } else {
        return f(dis/1000, 2) + '公里';
      }
    }
  })
  .directive('chart', function() {
		return {
			restrict:'E',
			replace:true,
			scope: {
				options:'=',
				// data:'=',
      	model: "=ngModel",
				click:'&'
			},
			template:'<div></div>',
			link:function(scope, element, attrs, ctrls){
				// utils.ocload.load([
				// 	'app/base/lib/jQuery/jQuery-2.1.4.min.js',
				// 	// 'app/base/lib/echarts/echarts.js',
				// 	'app/base/lib/echarts/echarts.simple.min.js',
				// ]).then(function () {
					element = $(element[0]);
					if(attrs.width){
						element.css('width',attrs.width);
					}
					if(attrs.height){
						element.css('height',attrs.height);
					}
					var types = attrs.type.split(',');
					for(var i in types){
						types[i] = ('echarts/chart/'+types[i]);
					}
					(function(echarts){
						var myChart = echarts.init(element[0]);
						// require(types,function(){
							if(scope.model){
								myChart.setOption(scope.model);
                myChart.on('click', function(data){
                	if(scope.click){
                		scope.click({data:data});
                	}
                });
							}

							scope.$watch('model',function(newValue){
								if(newValue){
									myChart.setOption(newValue);
									scope.data = myChart.getDataURL();
								}
							});
						// });
					})(echarts);

				// });
			}
		};
	});
