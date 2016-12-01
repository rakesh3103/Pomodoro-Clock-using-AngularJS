/**
 * Created by Rakesh on 12/1/2016.
 */

var app=angular.module('clockApp', []);

app.filter('secondsFormat', function(){


    return function(seconds){
        seconds = Number(seconds);
        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 3600 % 60);
        return (
        (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
        );
    };

});

app.controller("clockCtrl", function($scope, $interval){

    console.log("Hello Angular");

    $scope.break = 5;
    $scope.session = 25;

    $scope.timer = $scope.session*60;
    $scope.breakTimer = $scope.break;
    $scope.timerOn = false;

    $scope.type = "Session";
    /*
     $scope.$watch($scope.session, function(newValue, oldValue, scope){
     console.log("Watch called");
     $scope.timer = $scope.session*60;
     })
     */

    $scope.breakMinus = function(){
        if(!$scope.timerOn) {
            if($scope.break > 1){

                $scope.break--;
                $scope.breakTimer = $scope.break;
            }
        }

    };

    $scope.breakPlus = function(){
        if(!$scope.timerOn) {
            $scope.break++;
            $scope.breakTimer = $scope.break;
        }
    };

    $scope.sessionMinus = function(){
        if(!$scope.timerOn){
            if($scope.type === "Session") {
                if ($scope.session > 1) {
                    $scope.session--;
                    $scope.timer = $scope.session*60;
                }
            }

        }
    };

    $scope.sessionPlus = function(){
        if(!$scope.timerOn) {
            if ($scope.type === "Session") {
                $scope.session++;

                $scope.timer = $scope.session * 60;
            }
        }
    };
    $scope.isClicked = false;




    $scope.click = function(){

        // alert("Timer clicked");

        timer($scope.type);




    };

    function timer(type){
        //console.log("Type: " +type );

        if(type === "Session"){
            $scope.type = "Session";
            //$scope.timer = $scope.session*10;
        } else if(type==="Break"){
            $scope.type = "Break";
            //$scope.timer = $scope.break*10;

        }


        if(!$scope.isClicked){
            //console.log("In IF Timer");
            intervalID  = $interval(function(){

                $scope.timer--;
                if($scope.timer <1){
                    if(type === "Session"){
                        $scope.timer = $scope.breakTimer*60;
                        $scope.isClicked = false;
                        $interval.cancel(intervalID);
                        $("#timer").css("border", " solid 5px red");
                        timer("Break");
                    }else if(type === "Break"){
                        $scope.timer = $scope.session*60;
                        $scope.isClicked = false;
                        $interval.cancel(intervalID);
                        $("#timer").css("border", " solid 5px green");
                        timer("Session");
                    }
                }
                $scope.isClicked = true;
                $scope.timerOn = true;

            },1000);
        }else{
            //console.log("In Else Timer");
            $interval.cancel(intervalID);
            $scope.isClicked = false;
            $scope.timerOn = false;


        }




    }





});
