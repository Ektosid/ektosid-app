
angular.module('applicationControllers').
controller('signupController', ['$scope', '$location', '$http', '$routeParams', '$rootScope', 'ProjectCouch1', 'viewGetter', '$cookieStore', 'ProjectCouch', 'ProjectCouch1234', 'ProjectCouch0', 'md5',
function($scope, $location, $http, $routeParams, $rootScope, ProjectCouch1, viewGetter, $cookieStore, ProjectCouch, ProjectCouch1234, ProjectCouch0, md5)
{
   $('#headernav').hide();

  ///////////////////////////////////////////get the user ids and names. 
viewGetter.get(function(data) 
{
    $rootScope.userData = data;
    
    console.log(data);
   
});


$scope.dtt = "Date of Birth";
 $scope.dt = "Salary Date";

 /*$scope.newUser = [];

 $scope.newUser.gender='Gender';

 $scope.newUser.country='country';

 $scope.newUser.salary_date='salary_date';

 $scope.newUser.currency='currency';

 $scope.newUser.salary = 0;*/


//$scope.showlog = false; 
$scope.signup = function ()
{
$scope.newUser.type = "user";


var e = document.getElementById("gender");
var gender = e.options[e.selectedIndex].value;
$scope.newUser.gender = gender;

var e1 = document.getElementById("country");
var country = e1.options[e1.selectedIndex].value;
$scope.newUser.country = country;

var e11 = document.getElementById("salary_date");
var salary_date = e11.options[e11.selectedIndex].value;
$scope.newUser.salary_date = salary_date;

var e111 = document.getElementById("currency");
var currency = e111.options[e111.selectedIndex].value;
$scope.newUser.currency = currency;


  $scope.hashed = md5.createHash($scope.newUser.password);
  console.log($scope.hashed);
  $scope.newUser.password = $scope.hashed;

    $scope.newUser.savings = Number($scope.newUser.currentSalary) + Number($scope.newUser.otherSalary);

var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) 
      {
        dd='0'+dd
      } 

      if(mm<10) 
      {
        mm='0'+mm
      } 

      today = dd+'/'+mm+'/'+yyyy;

$scope.newUser.dob = today;

var todayy = new Date();
      var dd = todayy.getDate();
      var mm = todayy.getMonth()+1; //January is 0!
      var yyyy = todayy.getFullYear();

      if(dd<10) 
      {
        dd='0'+dd
      } 

      if(mm<10) 
      {
        mm='0'+mm
      } 

      todayy = dd+'/'+mm+'/'+yyyy;

//$scope.newUser.salary_date = todayy;

//$scope.newUser._attachment = "/Users/Snap/Desktop/Sippi/Pics/img.jpg";
$rootScope.newUser = $scope.newUser;
$rootScope.loghim = true;


for (var k = 0; k < $rootScope.userData.rows.length; k++)
{
        //console.log("ID: " + $rootScope.userData.rows[k].value + "      Name: " + $rootScope.userData.rows[k].key);
        if ($rootScope.newUser.email == $rootScope.userData.rows[k].key)
        {
          $rootScope.loghim = false;
          
          alert("E-mail already exists! Please use another email address.");
          
        }
}
if ($rootScope.loghim == true)
{
  //var json = $scope.newUser;


  var t = JSON.stringify($rootScope.newUser);
  //var tt  = new JSONObject($rootScope.newUser);


  ProjectCouch1234.save(t, function(user) 
    {
      $cookieStore.put('userEmail', $scope.newUser.email);
      $cookieStore.put('userId', user.id);

      console.log(user);
      
      $location.path("/profile");


    });  
}


}


$scope.todayy = function() {
    $scope.dtt = new Date();
  };
  $scope.todayy();
  $scope.dtt = "Date of Birth";

  


   $scope.openn = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedd = true;
  };




  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

 
 $scope.dt = "Salary Date";

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];



}]);
