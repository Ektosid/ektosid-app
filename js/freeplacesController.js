
angular.module('applicationControllers').
controller('freeplacesController', ['$scope', '$location', '$http', '$routeParams', '$rootScope', "$cookieStore", 'infoGetter',
function($scope, $location, $http, $routeParams, $rootScope, $cookieStore, infoGetter)
{
   $('#headernav').show();
   $('#footernav').hide();

  $scope.showlog = false;   
  $scope.dataa = [1, 2, 4]; 

  $http.get("http://www.lebtivity.com/api/v1/events?api_key=a79f994fd1&from_date=2015-04-01&to_date=2016-01-01&sort=time")
  .success(function (data)
   { 
      $scope.dataa = data;
      console.log(data);
      
    })
  .error(function (data)
  {});
  

  infoGetter.get(function(data) 
  {
    //console.log(data);
   
    for (var k = 0; k < data.rows.length; k++)
    {
        if (data.rows[k].id == $cookieStore.get('userId'))
        {
          $scope.namee = data.rows[k].key[0];
        }
    }
  
    });

}]);