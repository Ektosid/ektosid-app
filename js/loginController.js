angular.module('applicationControllers').
controller('loginController', ['$scope', '$location', '$http', '$routeParams', '$rootScope', 'viewGetter', 'ProjectCouch', '$cookieStore','$timeout', 'md5',
function($scope, $location, $http, $routeParams, $rootScope, viewGetter, ProjectCouch, $cookieStore, $timeout, md5)
{

  $('#headernav').hide();
  $('.actionBar').addClass('actionBarHide');

  ///////////////////////////////////////////get the user emails and passwords. 
viewGetter.get(function(data) 
{
  $scope.userData = data; 
  console.log(data);
});

  $scope.showlog = true;  

$scope.yes = false;



  $scope.login = function ()
  {
    $scope.hashed = md5.createHash($scope.user.pass);
    console.log($scope.hashed);

    for (var k = 0; k < $scope.userData.rows.length; k++)
    {
      //console.log("email: " + $scope.userData.rows[k].key + "      pass: " + $scope.userData.rows[k].value);
      if ($scope.user.email == $scope.userData.rows[k].key)
      {
        if ($scope.hashed == $scope.userData.rows[k].value)
        {
          $scope.yes = true;
          $scope.user.idd = $scope.userData.rows[k].id;
          
          $cookieStore.put('userId', $scope.user.idd);
          $cookieStore.put('userEmail', $scope.user.email);
        }
      }
    } 

    if ($scope.yes == true)
    {
      $location.path("/wallet");
    }
    else
    {
      alert("Invalid credentials");
    }
  }
  
   
}]);