angular.module('applicationControllers').
controller('chartController', ['$scope', '$location', '$http', '$routeParams', '$rootScope', 'infoGetter', '$cookieStore', 'viewGetter2',
function($scope, $location, $http, $routeParams, $rootScope, infoGetter, $cookieStore, viewGetter2)
{  
   $('#headernav').show();
   $('#footernav').hide();

  $rootScope.myInData = [];
  $rootScope.myOutData = [];
  $scope.salary = 0;

  $rootScope.innn12 = [];
  $rootScope.innn12.value = [];
  $rootScope.innn12.color = [];
  $rootScope.innn12.highlight = [];
  $rootScope.innn12.label = [];


   $rootScope.out12 = [];
  $rootScope.out12.value = [];
  $rootScope.out12.color = [];
  $rootScope.out12.highlight = [];
  $rootScope.out12.label = [];



  //var myInData = [ {value:  '', label:    ''} ];

  $rootScope.myInData.value = [];
  $rootScope.myInData.label = [];

  $rootScope.myOutData.value = [];
  $rootScope.myOutData.label = [];

  var ctx = document.getElementById("incoming").getContext("2d");
  var ctx1 = document.getElementById("outgoing").getContext("2d");

  window.myDoughnut = 0;
  window.myDoughnut1 = 0;

  infoGetter.get(function(data) 
  {
    console.log(data);
   
    for (var k = 0; k < data.rows.length; k++)
    {
        if (data.rows[k].id == $cookieStore.get('userId'))
        {
          $scope.salary = data.rows[k].key[10];

          $scope.currency = data.rows[k].key[8];

          $scope.savings = data.rows[k].key[12];
        }
    }
  
    });

  //console.log($scope.salary)

  viewGetter2.get(function(data) 
  {
    

    for (var k = 0; k < data.rows.length; k++)
    {
      //console.log(data.rows[k].key[1]);
        if (data.rows[k].value == $cookieStore.get('userEmail') && data.rows[k].key[3] == 'incoming')
        {
          $rootScope.myInData.value.push(data.rows[k].key[1] / 100);
          $rootScope.myInData.label.push(data.rows[k].key[0]);
        }

        if (data.rows[k].value == $cookieStore.get('userEmail') && data.rows[k].key[3] == 'outgoing')
        {
          /*$rootScope.myOutData.value += data.rows[k].key[1];
          $rootScope.myOutData.label += data.rows[k].key[3];*/

          $rootScope.myOutData.value.push(data.rows[k].key[1] / 100);
          $rootScope.myOutData.label.push(data.rows[k].key[0]);
        }
    }
    //console.log($rootScope.myInData);

    for (var i = 0; i < $rootScope.myInData.label.length; i++)
    {
        var data = new Object();
      data.value = 0;
      data.color = '';
      data.highlight = '';
      data.label = '';

      data.value = $rootScope.myInData.value[i];
      var co = "" + Math.random() * 1000000000000000000;
      var hi = "" + Math.random() * 1000000000000000000;
      sub1 = hi.substr(1, 6);
      sub2 = co.substr(1, 6);

      data.highlight = "#" + sub1;
      data.label = $rootScope.myInData.label[i];
      data.color = "#" + sub2;

      $rootScope.innn12.push(data);

      console.log($rootScope.myInData.value[i]);
    }

    for (var i = 0; i < $rootScope.myOutData.label.length; i++)
    {  
            var data = new Object();
            //var data = {};
            data.value = 0;
            data.color = '';
            data.highlight = '';
            data.label = '';

            data.value = $rootScope.myOutData.value[i];
            var co = "" + Math.random() * 1000000000000000000;
            var hi = "" + Math.random() * 1000000000000000000;
            sub1 = hi.substr(1, 6);
            sub2 = co.substr(1, 6);

            data.highlight = "#" + sub1;
            data.label = $rootScope.myOutData.label[i];
            data.color = "#" + sub2;

            $rootScope.out12.push(data);

            console.log($rootScope.myOutData.value[i]);
           
    }


    console.log($rootScope.innn12.length);

    
    window.myDoughnut = new Chart(ctx).PolarArea($rootScope.innn12, {responsive : false});
    window.myDoughnut1 = new Chart(ctx1).PolarArea($rootScope.out12, {responsive : false});

  });

  $scope.showlog = false;   

      //var ctx = document.getElementById("chart-area").getContext("2d");
      //window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {responsive : false});


      $scope.outgoing = function ()
      {
        //alert(1)
        //window.myDoughnut = null;
        //$("#chart-area").addClass("actionBarHide");
        //var ctx = 0;
        //var ctx = document.getElementById("chart-area").getContext("2d");
        /*for (var i = 0; i < $rootScope.innn12.length; i++)
        {
          window.myDoughnut.segments[i] = 0;//removeData(i);
        }*/
        
        for (var i = 0; i < $rootScope.myOutData.label.length; i++)
        {  
            //var data = new Object();
            var data = {};
            data.value = 0;
            data.color = '';
            data.highlight = '';
            data.label = '';

            data.value = $rootScope.myOutData.value[i];
            var co = "" + Math.random() * 1000000000000000000;
            var hi = "" + Math.random() * 1000000000000000000;
            sub1 = hi.substr(1, 6);
            sub2 = co.substr(1, 6);

            data.highlight = "#" + sub1;
            data.label = $rootScope.myOutData.label[i];
            data.color = "#" + sub2;

            $rootScope.out12.push(data);

            console.log($rootScope.myOutData.value[i]);
           
        }

          console.log($rootScope.innn12);
          //window.myDoughnut = new Chart(ctx).Doughnut($rootScope.out12, {responsive : false});
          //$("#chart-area").addClass("actionBarHide");
          

      }
        
}]);






