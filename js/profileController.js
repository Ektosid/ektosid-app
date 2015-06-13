

angular.module('applicationControllers')
.controller('profileController', ['$scope', '$http', '$location', '$rootScope', 'ProjectCouch0','$timeout', 'infoGetter', '$cookieStore', 'ProjectCouch66', '$routeParams', function($scope, $http, $location, $rootScope, ProjectCouch0, $timeout, infoGetter, $cookieStore, ProjectCouch66, $routeParams)
{
     $('#headernav').show();
     $('#footernav').hide();

$scope.showlog = false;   
$rootScope.inProfile = true;

$scope.theuser = [];

$scope.src = 0;

$scope.profilepic = false;

 infoGetter.get(function(data) 
  {
    for (var k = 0; k < data.rows.length; k++)
    {
        if (data.rows[k].key[1] == $cookieStore.get('userEmail'))
        {
            $scope.theuser.namee = data.rows[k].key[0];

            $scope.theuser.email = data.rows[k].key[1];

            $scope.theuser.pass = data.rows[k].key[2];

            $scope.theuser.gender = data.rows[k].key[3];

            $scope.theuser.dob = data.rows[k].key[4];

            $scope.theuser.country = data.rows[k].key[5];

            $scope.theuser.city = data.rows[k].key[6];

            $scope.theuser.salary_date = data.rows[k].key[7];

            $scope.theuser.currency = data.rows[k].key[8];

            $scope.theuser.currentWork = data.rows[k].key[9];

            $scope.theuser.currentSalary = data.rows[k].key[10];

            $scope.theuser.otherSalary = data.rows[k].key[11];

            $scope.theuser.savings = data.rows[k].key[12];

            $scope.theuser.pic = data.rows[k].key[13];
            if ($scope.theuser.pic == 0)
                $scope.profilepic = 3;

          
       
        //$scope.theuser = data.rows[k].key;
         console.log(data.rows[k]);
        }
      }
      //console.log($rootScope.infoo);
    });



 $("#chooseFile").click(function(e){
      e.preventDefault();
      $("input[type=file]").trigger("click");
    });
    $("input[type=file]").change(function(){
      var file = $("input[type=file]")[0].files[0];            
      $("#chooseFile").empty();
      displayAsImage3(file, "chooseFile");
      //alert(file.name + " " + file.size + " " + file.source + " " + file.location );
      
      });


    function displayAsImage3(file, containerid) {
    if (typeof FileReader !== "undefined") {
      var container = document.getElementById(containerid),
          img = document.createElement("img"),
          reader;
      container.appendChild(img);
      reader = new FileReader();
      reader.onload = (function (theImg) {
        return function (evt) {
          theImg.src = evt.target.result;

          $scope.src = evt.target.result;
      
        //console.log(src);

        updateNew();
        saveNew();

        };
      }(img));
      reader.readAsDataURL(file);

      

    }
  }











//////slider
///Get the maximum number of pics that are to be slided
///Get an array of pics 
///Suppose that this is the array we got from the database
$scope.pics = ['http://72abfb7c1a8a71411901-4a3d306595cd09781b35fe13ebdb4f63.r27.cf2.rackcdn.com/D5204D6B-B1D1-42D5-8948-EEB1ACCD02C7.jpg', 'http://www.mvelopes.com/wp-content/uploads/Save-money.jpg', 'http://degreesource.com/wp-content/uploads/2013/07/debt_payment.jpg', 'http://dailygenius.com/wp-content/uploads/2014/09/Business_haandslag_sh_lille.jpg'];//, 'images/8888.jpg', 'images/9999.jpg', 'images/10101010.jpg']; //
var indexx = 1; //for the indicators. Starts at 1 knowing the first indicator ball is activated in the init method
var count = 0;
var start = 0;
var picCount = 0;
var indexPressed = 0;
var isPressed = false;
var previousIndex = 0;
var temp = 0;
var delay = 5000; //7000
var mytimeout = 0;

var numberOfPics = $scope.pics.length;
var lastIndex = $scope.pics.length - 1;

$scope.currentSliderPic = $scope.pics[0];


///////////////////////////////////////////Just at the start increase the first indicator size
$scope.init = function()
{
    $scope.onTimeout = function()
    {
        addClass("#indicator" + 0, 'active');
        addClass(".img" + 0, 'img')
    }

    var mytimeout = $timeout($scope.onTimeout,100);
}
$timeout($scope.init);



function setSlide()
{
    $timeout($scope.slide);
}


///////////////////////////////////////////The slider method
$scope.slide = function()
{
        //if (hover == false)
            mytimeout = $timeout($scope.slide, delay); 

        ++picCount;

        if (picCount == numberOfPics)
        {
            picCount = 0;
        }

        $timeout.cancel(mytimeout);
        
        if (indexx == numberOfPics)
        {
            //Decrease the 4th indicator size and put the values of the counter equals to zero to start again
            removeClass("#indicator" + lastIndex, "active");
            removeClass(".img" + lastIndex, 'img');

            indexx = 0;
            count = 0;
        }
        
        addClass(".img" + indexx, "img");

        //Increase the current indicator size
        addClass("#indicator" + indexx, "active");

       //Decrease the previous indicator size
        var varr = indexx - 1;
        if (count > 0 && indexx < numberOfPics) // && !isPressed
            removeClass("#indicator" + varr, "active")
        
        //Just at the start, decrease the first indicator size after increasing its size in the $scope.init() method
        if (start == 0)
        {
            removeClass("#indicator" + varr, "active")
        }

        //Increment the counters
        indexx++;
        count++;
        start++;

        var prev = indexx - 2;
        removeClass(".img" + prev, "img");
}
mytimeout = $timeout($scope.slide, delay); //7000


$scope.slideTo = function (index)
{
    $timeout.cancel(mytimeout);

    previousIndex = indexx - 1; //Store the value of the index of the current picture //indexx 
    indexPressed = index;

    if (indexPressed > count || indexPressed == count) //pressed after the indicator
    {
        doMove(previousIndex, indexPressed);
    }
    else if (indexPressed < count)  //pressed before the indicator
    {
        doMove(previousIndex, indexPressed);
    }

    indexx = indexPressed; //current index is equal to the pressed index
    count = indexPressed; //the loop count is equal to the pressed index 

    $timeout($scope.slide);
}


$scope.previous = function ()
{
    $timeout.cancel(mytimeout);

    currentIndex = count - 1; //Store the value of the index of the current picture //indexx 
    previousIndex = count - 2;

    //currentIndex = picCount;
    //previousIndex = count - 2;
    
    if (count == 1)
    {
        previousIndex = lastIndex;
        currentIndex = 0;
    }

    doMove(currentIndex, previousIndex);
    
    indexx = previousIndex; 
    count = previousIndex; 

    $timeout($scope.slide);
}

$scope.next = function ()
{
    $timeout.cancel(mytimeout);

    currentIndex = count - 1; 
    nextIndex = count;

    doMove(currentIndex, nextIndex);

    indexx = nextIndex; 
    count = nextIndex; 

    $timeout($scope.slide);
}


function removeClass (str1, str2)
{
    $(str1).removeClass(str2);
}

function addClass (str1, str2)
{
    $(str1).addClass(str2);
}

function doMove(old, neww)
{
    removeClass("#indicator" + old, "active");
    addClass("#indicator" + neww, "active");

    removeClass(".img" + old, "img");
    addClass(".img" + neww, "img");
}




  //First we save the user info and then we update the couchDB document with the score so we use these to fuctions to store the data for this ID
//////////////////////////////////////////////////////////////////////////Update user data at a certain id
function updateNew()
{
    var id = $cookieStore.get("userId");
    $routeParams.UID = id;

    var self = this;
    ProjectCouch66.get({q: $routeParams.UID}, function(user) 
    {
        self.original = user;
        $rootScope.theupdateuser = new ProjectCouch66(self.original);

        
        $rootScope.theupdateuser.pic = $scope.src;
        


        //$rootScope.continuee. = $scope.answersQuestionnaire;
       console.log($rootScope.theupdateuser);

    });
}

function saveNew() 
{
  $scope.onTimeoutt = function()
  {
    $rootScope.theupdateuser.update(function() { });
  } 
  var mytimeoutttt = $timeout($scope.onTimeoutt,50);
};









}]);

 