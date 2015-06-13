angular.module('applicationControllers').
controller('pastinpastoutController', ['$scope', '$location', '$http', '$routeParams', '$rootScope', 'infoGetter3333', '$cookieStore',
function($scope, $location, $http, $routeParams, $rootScope, infoGetter3333, $cookieStore)
{
$scope.showlog = false;   
$scope.data = '';
$scope.json = '';

 $('#headernav').show();
 $('#footernav').hide();

 $rootScope.ppaasstt = [{
    name:"",
   	date:"",
   	value:"",
   	type:"",
   	pic:"",
   	currency: ""
}];

$rootScope.sorted = {};

 $rootScope.notificationss = [{
    value:"",
}];

 $scope.notifications = [{value: ''}];//, {value: 'out'}, {value: 'in'}, {value: 'out'}, {value: 'in'}, {value: 'out'}, {value: 'in'}, {value: 'out'}, {value: 'in'}, {value: 'out'}, {value: 'in'}, {value: 'out'}, {value: 'in'}, {value: 'out'}, {value: 'in'}, {value: 'out'} ];

 infoGetter3333.get(function(data)
 {
 	//console.log($cookieStore.get('userEmail'));

    for (var k = 0; k < data.total_rows; k++)
    {
        if (data.rows[k].key === $cookieStore.get('userEmail'))
        {
        	$rootScope.temp = {
        		name:"",
        		date:"",
        		value:"",
        		type:"",
        		pic:"",
        		currency:""
      		};

      		$scope.notifications = {value: ''};
   
         	$rootScope.temp.name = data.rows[k].value.name ;
          

          	$rootScope.temp.value = data.rows[k].value.value ;

          	$rootScope.temp.date = data.rows[k].value.date ;

          	$rootScope.temp.type = data.rows[k].value.expense_type ;

          	$rootScope.temp.pic = data.rows[k].value.pic ;

          	$rootScope.temp.currency = data.rows[k].value.currency ;


          	$scope.notifications.value = $rootScope.temp.type;

            $scope.data += "Expense # " + k + "          " + $rootScope.temp.name + "               " + $scope.temp.currency + ' ' + $rootScope.temp.value + '               ' + $rootScope.temp.date + '                    ' + $scope.notifications.value + " \r \r\n\n";

          	console.log(data.rows[k]);
            $rootScope.ppaasstt.push($rootScope.temp); 
            $rootScope.notificationss.push($scope.notifications);
      	}

      	
    }

     //console.log($scope.notificationss);
     $scope.json = $rootScope.ppaasstt;
    // console.log($scope.json)
     //json = JSON.stringify($rootScope.ppaasstt);

     /*for (var i = 0; i < $rootScope.ppaasstt.length; i++)
     {
       for (var t = i+1; t <= $rootScope.ppaasstt.length; t++)
       {
        if (parseInt($rootScope.ppaasstt[i].date) < parseInt($rootScope.ppaasstt[t].date))
        {
          $rootScope.sorted.push($rootScope.ppaasstt[i]);
        }
       }
     }*/

});

  
$scope.getBlob = function()
{
    return new Blob([$scope.data], {type: "application/text"});
}

   
}]);




angular.module('applicationControllers').directive('myDownload', function ($compile) {
    return {
        restrict:'E',
        scope:{ getUrlData:'&getData'},
        link:function (scope, elm, attrs) {
          setTimeout(function ()
          {
            var url = URL.createObjectURL(scope.getUrlData());
              elm.append($compile(
              '<nav class="navbar navbar-default navbar-fixed-bottom" style="position: fixed; bottom: -7; opacity: 0.9; background: #151515; border-top: 5px solid #000; z-index: 9999999; height: 8%;   padding-left: 9px; "> <a id="incoming" download="Expenses-Report.txt" class="col-lg-3 col-md-3 col-sm-3 col-xs-3"  style="padding-left: 87px; left: 38%; border: 3px solid orange; border-radius: 8px; color: orange;"' + 'href="' + url + '" ' + '><font face="futura">Download Report</font></a></nav>'
              )(scope));

          }, 200);
           /* $(window).load(function() 
            {
              

            }); */
        }
    };
});