angular.module('starter').directive('stepCircle', ['$ocLazyLoad',
    function($ocLazyLoad) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                target: '@',
                step: '@',
                imgSrc:'@'
            },
            template: '<div class="container"><div id="wrap"><ul id="list"></ul><div class="in-circle"><div class="step-circle-head">今日步数</div><div class="step-circle-step" ng-bind="vo.showStep">1198</div><div class="step-circle-target">目标 <span ng-bind="target"></span> 步</div></div></div>',
            link: function(scope, element, attrs, ctrls) {
            	$ocLazyLoad.load([
            			'js/directive/stepCircle.css',
            		]).then(
            		function(){
                    scope.vo = {};
		                var aLi = "";
		                for (var i = 0; i < 60; i++) {
		                    aLi += "<li style='-webkit-transform:rotate(" + 6 * i + "deg)'></li>";
		                }
		                aLi += "<li><img src='"+scope.imgSrc+"' style='-webkit-transform:rotate(90deg)'></li>";
		                // oList.innerHTML = aLi;
		                $('#list').html(aLi);
		                // showStep();

		                scope.$watch('step', showStep);

		                function showStep(){
		                	// console.log('scope.step', scope.step);
		                	// console.log('scope.target', scope.target);
                      scope.vo.step = 0;
                      scope.vo.percent = 0;
                      var per = scope.step/20;
                      scope.vo.timer = setInterval(function(){
                        scope.vo.step += per;
                        if(scope.vo.step >= scope.step){
                          // scope.vo.step = scope.step;
                          clearInterval(scope.vo.timer);
                        }
                        scope.vo.percent = scope.vo.step/scope.target;
                        countingStep(scope.vo.percent);
                      }, 50);
                    }
                    function countingStep(percent){
                        scope.$apply(scope.vo.showStep = Math.floor(scope.vo.step));
			            $('#wrap ul li').attr('class', '');
			            $('#wrap ul li:nth-child(-n+'+ (1 + Math.floor(percent*60)) +')').attr('class', 'passed');
			            $('#wrap ul li:last-child').css({'-webkit-transform': 'rotate('+(percent*360)+'deg)', 'background':'transparent'});
	                }



		              //   setInterval(function() {
		              //       toTime();
		              //   }, 1000);

		              //   function toTime() {
		              //       // if ($('#wrap').length > 0 && !scope.inited) {
		              //       //     init();
		              //       //     scope.inited = true;
		              //       // }
		              //       var oDate = new Date();
		              //       var iSec = oDate.getSeconds();

				            // $('#wrap ul li').attr('class', '');
				            // $('#wrap ul li:nth-child(-n+'+ (1 + iSec) +')').attr('class', 'passed');
				            // $('#wrap ul li:last-child').css('-webkit-transform', 'rotate('+(iSec*360/60)+'deg)');
		              //       // $('#wrap ul li').css('background', 'rgba(251,128,64, 1)');
		              //       // $('#wrap ul li:nth-child(-n+' + (1 + iSec) + ')').css('background', 'white');
		              //       // $('#wrap ul li:last-child').css({ '-webkit-transform': 'rotate(' + (iSec * 360 / 60) + 'deg)', 'background': 'transparent' });
		              //   }
            		});
                // function init() {
                //     $('#wrap').css({
                //         width: '200px',
                //         height: '200px',
                //         position: 'relative',
                //         'border-radius': '50%',
                //         border: '0px solid black',
                //         margin: '100px auto,padding: 0 0'
                //     });
                //     $('#wrap ul').css({
                //         margin: '0px',
                //         padding: '0px',
                //         height: '200px',
                //         'list-style': 'none',
                //         position: 'relative'
                //     });
                //     $('#wrap ul li ').css({
                //         width: '5px',
                //         height: '5px',
                //         background: 'rgba(251,128,64, 1)',
                //         position: 'absolute',
                //         left: '98px',
                //         top: '5px',
                //         '-webkit-transform-origin': 'center 95px',
                //         'border-radius': '50%'
                //     });
                //     $('#wrap ul li:last-child ').css({
                //         width: '5px',
                //         height: '5px',
                //         background: 'url(./foot.png)',
                //         position: 'absolute',
                //         left: '98px',
                //         top: '0px',
                //         '-webkit-transform-origin': 'center 100px',
                //         'border-radius': '0',
                //         'background-position': 'right bottom'
                //     });
                //     $('#wrap ul li.passed').css({
                //         background: 'white'
                //     });
                //     $('#wrap ul li img').css({
                //         filter: 'invert(100%)',
                //         width: '400%',
                //         height: '400%',
                //         'margin-left': '-5px',
                //         'margin-top': '-2px'
                //     });
                // }
            }
        }
    }
])
