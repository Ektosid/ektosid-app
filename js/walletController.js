
var applicationControllers = angular.module('applicationControllers',['ui.bootstrap']);

angular.module('applicationControllers').
controller('walletController', ['$scope', '$location', '$http', '$routeParams', '$rootScope', 'ProjectCouch1', 'viewGetter2', '$cookieStore', 'infoGetter', 'ProjectCouch66', '$timeout', 'orders',
function($scope, $location, $http, $routeParams, $rootScope, ProjectCouch1, viewGetter2, $cookieStore, infoGetter, ProjectCouch66, $timeout, orders)
{
    $('#headernav').show();
    $('#footernav').hide();
    $('.actionBar').removeClass('actionBarHide');

    
  $rootScope.money = [{
    name:"",
    date:"",
    value:"",
    type:"",
    pic:""
}];

$rootScope.orderss = [{
    name:[],
    date:"",
    price:"",
    people:"",
    table:""
}];
$rootScope.orderss.name = [];

$scope.physicalValues = [];

$scope.currentDate = 0;
$scope.currentDay = '';
$scope.remoteData = 0;

function now()
{

  $scope.currentDate = new Date();
  var day = $scope.currentDate.getDay();
  if (day == 1)
    $scope.currentDay = 'Monday';
  if (day == 2)
    $scope.currentDay = 'Tuesday';
  if (day == 3)
    $scope.currentDay = 'Wednesday';
  if (day == 4)
    $scope.currentDay = 'Thursday';
  if (day == 5)
    $scope.currentDay = 'Friday';
  if (day == 6)
    $scope.currentDay = 'Saturday';
  if (day == 7)
    $scope.currentDay = 'Sunday';

}

$rootScope.infoo = [];



   $scope.showlog = false; 



   ///////////update savings
   //updateNew(100, 'inn');
   //saveNew();

   //updateNew(100, 'out');
   //saveNew();




  viewGetter2.get(function(data) 
  {
    //$scope.money = data; 
    //console.log(data);
    $scope.remoteData = data;
    console.log("money:");
    console.log($scope.remoteData);
    for (var k = 0; k < data.rows.length; k++)
    {
        if (data.rows[k].value == $cookieStore.get('userEmail'))
        {

        $rootScope.temp = {
        name:"",
        date:"",
        value:"",
        type:"",
        pic:""
      };

      //get current date
      now();
      //console.log(data.rows[k].value)
      //console.log("maybe date: " + data.rows[k].key[2] );
      /*if (data.rows[k].key[2] === $scope.now)
      {
        if (data.rows[k].key[3] === "incoming")
        {
          $scope.physicalValues.newIn = data.rows[k].key[1];
          updateNew($scope.physicalValues.newIn, inn);
        }

        else if (data.rows[k].key[3] === "outgoing")
        {
          $scope.physicalValues.newOut = data.rows[k].key[1];
          updateNew($scope.physicalValues.newOut, out);
        }
      }*/

      //run the loop to check if the date of any expense is equal to the current day and then we query the db
     // $timeout($scope.checkDate());


      for (var i=0; i<data.rows[k].key.length; i++)
      {
        //$rootScope.money.push(data.rows[k].key[i]);
        //$rootScope.temp.push(data.rows[k].key[i]);
        if (i==0)
        {
            $rootScope.temp.name = data.rows[k].key[i] ;
        }

        if (i==1)
          $rootScope.temp.value = data.rows[k].key[i] ;

        if (i==2)
          $rootScope.temp.date = data.rows[k].key[i] ;

        if (i==3)
          $rootScope.temp.type = data.rows[k].key[i] ;

        if (i==4)
          $rootScope.temp.pic = data.rows[k].key[i] ;
      }
      //console.log($rootScope.temp.name);
      $rootScope.money.push($rootScope.temp); 

      /*$rootScope.money[0].name = $rootScope.temp.name;
      $rootScope.money[0].date = $rootScope.temp.date;
      $rootScope.money[0].value = $rootScope.temp.value;
      $rootScope.money[0].type = $rootScope.temp.type;
      $rootScope.money[0].repeat = $rootScope.temp.repeat;*/
      
    }
  }

  });

    //console.log($cookieStore.get('userEmail'));
    $scope.date = new Date();

    $scope.showDialog = false;



  infoGetter.get(function(data) 
  {
    console.log("data ");
    console.log(data);

    for (var k = 0; k < data.rows.length; k++)
    {
        if (data.rows[k].key[1] == $cookieStore.get('userEmail'))
        {

          $rootScope.infoo.salary = data.rows[k].key[10];

          $rootScope.infoo.currency = data.rows[k].key[8];

          $rootScope.infoo.namee = data.rows[k].key[0];

          $rootScope.infoo.date = data.rows[k].key[7];

          $rootScope.infoo.savings = Number (data.rows[k].key[12]);
        }
      }
      console.log($rootScope.infoo);
      checkSavings();
 });


function checkSavings ()
{
   if ($rootScope.infoo.savings <= 500)
      {
        
        $scope.showDialog = true;
        //$timeout(function () { $scope.showDialog = false; }, 7000);
      }
}


  $scope.incoming = 0;
  $scope.outgoing = 0;

    $scope.incoming.name='Name';
  $scope.outgoing.name='Name';
  $scope.outgoing.pic = '';
  $scope.incoming.pic = '';


   $scope.putIn = function ()
   {

    var dd = $scope.dt.getDate();
      var mm = $scope.dt.getMonth()+1; //January is 0!
      var yyyy = $scope.dt.getFullYear();

      if(dd<10) 
      {
        dd='0'+dd
      } 

      if(mm<10) 
      {
        mm='0'+mm
      } 

      $scope.dt = dd + '/' +mm+'/'+yyyy;
    
    $scope.incoming.date = $scope.dt;
    //alert($scope.incoming.date)
    $scope.incoming.type = "incoming";
    $scope.incoming.email = $cookieStore.get('userEmail');

    //console.log($scope.incoming.pi)
    ProjectCouch1.save($scope.incoming, function(project) {
      alert("The expense has been successfully saved.");
      $scope.reset1;
      $scope.incoming.value = 0;
      $scope.incoming.date = 0;
      $scope.incoming.name = ';'
      $modalInstance.dismiss('cancel');
      
    });
    setTimeout(function() {location.reload();}, 2000);

   }

   $scope.putOut = function ()
   {
    var ddd = $scope.dtt.getDate();
      var mmm = $scope.dtt.getMonth()+1; //January is 0!
      var yyyyy = $scope.dtt.getFullYear();

      if(ddd<10) 
      {
        ddd='0'+ddd
      } 

      if(mmm<10) 
      {
        mmm='0'+mmm
      } 

      $scope.dtt = ddd+'/'+mmm+'/'+yyyyy;

    $scope.outgoing.date = $scope.dtt;
    //alert($scope.outgoing.name)
    $scope.outgoing.type = "outgoing";
    $scope.outgoing.email = $cookieStore.get('userEmail');

    //console.log($scope.outgoing)
    ProjectCouch1.save($scope.outgoing, function(project) {
      alert("The expense has been successfully saved.");
      $scope.reset;
      $scope.outgoing.value = 0;
      $scope.outgoing.date = 0;
      $scope.outgoing.name = ';'
      $modalInstance.dismiss('cancel');
      
    });
    setTimeout(function() {location.reload();}, 2000);
    
   }


$scope.order = function ()
{
  $scope.restaurant.name = [];

  var e = document.getElementById("itemname");
  var item = e.options[e.selectedIndex].value;
  $scope.restaurant.name.push(item);
   $scope.restaurant.date = new Date();

  for(var t = 1; t<i; t++)
  {
    var ttt = "#itemname"+t;
    var item1 = $(ttt).val();
    $scope.restaurant.name.push(item1);
  }

  $scope.restaurant.type = "order";

  $scope.restaurant.email = $cookieStore.get('userEmail')

  console.log($scope.restaurant)

  ProjectCouch1.save($scope.restaurant, function(rest) {
      console.log("order" + rest)
      
    });

  updateNew($scope.restaurant.price, 'order');
  setTimeout(function() {location.reload();}, 2000);
    
}


orders.get(function(data) 
{
    console.log("orders");
    console.log(data);
   
    for (var k = 0; k < data.rows.length; k++)
    {
        if (data.rows[k].value == $cookieStore.get('userEmail') && data.rows[k].key.table != '' && data.rows[k].key.price != '' && data.rows[k].key.date != '' && data.rows[k].key.people != '' )
        { 
          $rootScope.tempp = {
          name:[],
          date:"",
          price:"",
          people:"",
          table:""
          };
        $rootScope.tempp.name = [];

          for (var i = 0; i < data.rows[k].key.name.length; i++)
            $rootScope.tempp.name.push(data.rows[k].key.name[i]);
            //$rootScope.orderss.name += '' + data.rows[k].key.name[i];

          $rootScope.tempp.table = data.rows[k].key.table;

          $rootScope.tempp.price = data.rows[k].key.price;

          $rootScope.tempp.date = data.rows[k].key.date;

          $rootScope.tempp.people = data.rows[k].key.people;

          $rootScope.orderss.push($rootScope.tempp); 
        }
      }
      console.log("show orders");
      console.log($rootScope.orderss);

 });

   //alert($rootScope.userEmail);

$rootScope.continuee = {};
   //First we save the user info and then we update the couchDB document with the score so we use these to fuctions to store the data for this ID
//////////////////////////////////////////////////////////////////////////Update user data at a certain id
function updateNew(val, type)
{
    var id = $cookieStore.get("userId");
    $routeParams.UID = id;

    var self = this;
    ProjectCouch66.get({q: $routeParams.UID}, function(user) 
    {
        self.original = user;
        $rootScope.continuee = new ProjectCouch66(self.original);

        if (type == 'inn')
        {
          $rootScope.continuee.savings = Number($rootScope.continuee.savings) + Number (val);
        }

        if (type == 'out')
        {
          $rootScope.continuee.savings = Number($rootScope.continuee.savings) - Number(val);
        }

        if (type == 'salary')
        {
          $rootScope.continuee.savings = Number($rootScope.continuee.savings) + Number(val);
          setTimeout(function() {
              $rootScope.continuee.update(function() { });

          }, 100);
        }

        if (type == 'order')
        {
          $rootScope.continuee.savings = Number($rootScope.continuee.savings) - Number(val);
          setTimeout(function() {
              $rootScope.continuee.update(function() { });

          }, 100);
        }


        //$rootScope.continuee. = $scope.answersQuestionnaire;
       console.log($rootScope.continuee);

    });
}


function saveNew(id, name, value, date, pic, type) 
{
  var ddd = id;

  var namee = name;
  var valuee = value;
   var datee = date;
  var picc = pic;
  var typee = type;

  $scope.pastInpastOut = {};

      $scope.pastInpastOut.name = namee;
      $scope.pastInpastOut.value = valuee;
      $scope.pastInpastOut.date = datee;
      $scope.pastInpastOut.expense_type = typee;
      $scope.pastInpastOut.type = "pasttt";
      $scope.pastInpastOut.pic = picc;
      $scope.pastInpastOut.email = $cookieStore.get('userEmail');
      $scope.pastInpastOut.currency = $rootScope.infoo.currency;

  $scope.onTimeoutt = function()
  {
    $rootScope.continuee.update(function() { });

    ProjectCouch66.get({q: id}, function(user) 
    {
      self.original = user;
      $rootScope.thisExp = new ProjectCouch66(self.original);

      $rootScope.thisExp.destroy(function() { }); 

      console.log($scope.pastInpastOut)


     ////////////////////////////////
      ProjectCouch1.save($scope.pastInpastOut, function(user) 
      {
        console.log(user)
        
      }); 



    });

    
  } 
  var mytimeoutt = $timeout($scope.onTimeoutt,50);
};

   if (Number($rootScope.infoo.date) === new Date().getDate())
    {
        updateNew($rootScope.infoo.salary, 'salary');
    }
     

    $scope.checkEXPENSES = function()
    {
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
      console.log($rootScope.infoo.date)

     

      for (var k = 0; k < $scope.remoteData.rows.length; k++)
      {
        if ($scope.remoteData.rows[k].key[3] === "incoming")
        { 
          
          if ($scope.remoteData.rows[k].value == $cookieStore.get('userEmail'))
          {

            //if ($scope.remoteData.rows[k].key[2] === today)
            //{
            //if ($scope.remoteData.rows[k].key[3] === "incoming")
              //{ 
              if ($scope.remoteData.rows[k].key[2] === today)
              {  console.log("in : " + $scope.remoteData.rows[k].key[0] + " " + $scope.remoteData.rows[k].key[1])
                $scope.physicalValues.newIn = $scope.remoteData.rows[k].key[1];
                $rootScope.inIID = $scope.remoteData.rows[k].id;
                updateNew($scope.physicalValues.newIn, 'inn');
                saveNew($rootScope.inIID, $scope.remoteData.rows[k].key[0], $scope.remoteData.rows[k].key[1], $scope.remoteData.rows[k].key[2], $scope.remoteData.rows[k].key[4], 'in');
                // mytimeout = null;
                //$timeout.cancel(mytimeout);
              }
            //}
          }
        }
            if ($scope.remoteData.rows[k].key[3] === "outgoing")
            { 
              if ($scope.remoteData.rows[k].value == $cookieStore.get('userEmail'))
              {
                if ($scope.remoteData.rows[k].key[2] === today)
                {  console.log("out : " + $scope.remoteData.rows[k].key[0]  + " " + $scope.remoteData.rows[k].key[1])
                  $scope.physicalValues.newOut = $scope.remoteData.rows[k].key[1];
                  $rootScope.outIID = $scope.remoteData.rows[k].id;
                  updateNew($scope.physicalValues.newOut, 'out');
                  saveNew($rootScope.outIID, $scope.remoteData.rows[k].key[0], $scope.remoteData.rows[k].key[1], $scope.remoteData.rows[k].key[2], $scope.remoteData.rows[k].key[4], 'out');

                  //mytimeout = null;
                  //$timeout.cancel(mytimeout);
                }
              }
          //}
          }
        }

        setTimeout(function() {location.reload();}, 500);
      
    };
      
      //mytimeout = $timeout($scope.onTimeout,1000);
    //}

   // var mytimeout = $timeout($scope.onTimeout,1000);
//}



 $("#chooseFile").click(function(e){
      //e.preventDefault();
      $("#infile").trigger("click");
    });
    $("#infile").change(function(){
      var file = $("#infile")[0].files[0];            
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

          $scope.incoming.pic = evt.target.result;
      
        //console.log(src);

        //updateNew();
        //saveNew();

        };
      }(img));
      reader.readAsDataURL(file);      

    }
  }

  $scope.reset1 = function ()
  {
     $("#chooseFile").empty();
  }

   $scope.reset = function ()
  {
     $("#chooseFile2").empty();
  }


$("#chooseFile2").click(function(e){
      //e.preventDefault();
      $("#outfile").trigger("click");
    });
    $("#outfile").change(function(){
      var file = $("#outfile")[0].files[0];            
      $("#chooseFile2").empty();
      displayAsImage33(file, "chooseFile2");
      //alert(file.name + " " + file.size + " " + file.source + " " + file.location );
      
      });


    function displayAsImage33(file, containerid) {
    if (typeof FileReader !== "undefined") {
      var container = document.getElementById(containerid),
          img = document.createElement("img"),
          reader;
      container.appendChild(img);
      reader = new FileReader();
      reader.onload = (function (theImg) {
        return function (evt) {
          theImg.src = evt.target.result;

          $scope.outgoing.pic = evt.target.result;
      
        //console.log(src);

        //updateNew();
        //saveNew();

        };
      }(img));
      reader.readAsDataURL(file);      

    }
  }







  $scope.todayy = function() {
    $scope.dtt = new Date();

    
  };
  $scope.todayy();

  $scope.dtt = "Date";


   $scope.openn = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedd = true;
  };




  $scope.today = function() {
    $scope.dt = new Date();

  };
  $scope.today();

  $scope.dt = "Date";

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

  var i = 1;

  $("#addItem").click(function () 
  {
    $("#scrollList").append('<select style="width: 80%;margin-top: 12px;height: 35px;  opacity: 0.9; border-radius: 100px; margin-left: 32px;" class="btn-default" id="itemname' + i + '" ><option selected value="" style="color: green;">Select item name </option> <option value="Hamburger">Hamburger</option><option value="Cheeseburger">Cheeseburger</option><option value="Bacon Cheddar Cheeseburger">Bacon Cheddar Cheeseburger</option><option value="Veggie Burger">Veggie Burger</option><option value="Double Cheeseburger">Double Cheeseburger</option><br><option value="Fries">Fries</option><option value="Crunchy Onion Rings">Crunchy Onion Rings</option><option value="Seasonal Vegetables">Seasonal Vegetables</option><option value="Ceasar Salad">Ceasar Salad</option><option value="Tuna Salad">Tuna Salad</option><option value="Vegetables Salad">Vegetables Salad</option><option value="Greec Salad">Greec Salad</option><option value="Chicken Wrap">Chicken Wrap</option><option value="Fajita">Fajita</option><option value="Francisco">Francisco</option><option value="Philadelphia">Philadelphia</option><option value="Steak">Steak</option><option value="Hot Turkey Sandwich">Hot Turkey Sandwich</option><option value="Grilled Cheese Sandwich">Grilled Cheese Sandwich </option></select>');
    i++;
  });






}]);







angular.module('applicationControllers').directive("modalShow", function ($parse) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            //Hide or show the modal
            scope.showModal = function (visible, elem) {
                if (!elem)
                    elem = element;

                if (visible)
                    $(elem).modal("show");                     
                else
                    $(elem).modal("hide");
            }

            //Watch for changes to the modal-visible attribute
            scope.$watch(attrs.modalShow, function (newValue, oldValue) {
                scope.showModal(newValue, attrs.$$element);
            });

            //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
            $(element).bind("hide.bs.modal", function () {
                $parse(attrs.modalShow).assign(scope, false);
                if (!scope.$$phase && !scope.$root.$$phase)
                    scope.$apply();
            });
        }

    };
});
































