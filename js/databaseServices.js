angular.module('CouchDB0', ['ngResource']).factory('ProjectCouch0', function($resource, $routeParams) 
{
  
  //name and email view
  var ProjectCouch0 = $resource(':protocol//:server/:db/:q/:b', 
    {protocol: 'http:', server: 'localhost:5984', db:'seniordb'}, {update: {method:'POST'} }
   ); 

  //Just for Posting
  //var ProjectCouch = $resource(':protocol//:server/:db/:q/:r', 
    //{protocol: 'http:', server: 'localhost:5984', db:'hireapp', q:'6888f27aae4a3186d2cfac001e00172a', r:'all.json'}, {update: {method:'GET'} }
   //); 



   ProjectCouch0.prototype.update = function(cb) 
   {
      //alert(this.email);
      return ProjectCouch0.update( {q: this._id}, this, cb);
   };

  ProjectCouch0.prototype.destroy = function(cb) 
  {
      return ProjectCouch0.remove({q: this._id, rev: this._rev}, cb);
  };

  ProjectCouch0.prototype.get = function(cb) 
  {
      return ProjectCouch0.get({q: this._id, rev: this._rev}, cb);
       //return ProjectCouch0.get(null, cb); //for the view
  };
  
    return ProjectCouch0;

});






angular.module('CouchDB', ['ngResource']).factory('ProjectCouch', function($resource) 
{

  var ProjectCouch = $resource(':protocol//:server/:db/:d/:v/:vv/:t',
    {protocol: 'http:', server: 'localhost:5984', db:'seniordb', d:'_design', v:'view', vv:'_view', t:'emailpass'}, {update: {method:'PUT'} }
   ); 

   ProjectCouch.prototype.update = function(cb) 
   {
      //return ProjectCouch.update({q: this._id}, this, cb);
   };

  ProjectCouch.prototype.destroy = function(cb) 
  {
      //return ProjectCouch.remove({q: this._id, rev: this._rev}, cb);
  };

  ProjectCouch.prototype.get = function(cb) 
  {
      return ProjectCouch.get(null, cb);
  };

  return ProjectCouch;

});




angular.module('CouchDB3', ['ngResource']).factory('viewGetter', function($resource) 
{
  
  var viewGetter= $resource(':protocol//:server/:db/:d/:v/:vv/:us', 
    {protocol: 'http:', server: 'localhost:5984', db:'seniordb', d:'_design', v:'view', vv:'_view', us:'emailpass'}, {update: {method:'PUT'} }
   ); 

  viewGetter.prototype.get = function(cb) 
  {
       return viewGetter.get(null, cb); //for the view
  };
  
    return viewGetter;

});

angular.module('CouchDB2', ['ngResource']).factory('viewGetter2', function($resource) 
{
  
  var viewGetter= $resource(':protocol//:server/:db/:d/:v/:vv/:us', 
    {protocol: 'http:', server: 'localhost:5984', db:'seniordb', d:'_design', v:'view', vv:'_view', us:'allinout'}, {update: {method:'PUT'} }
   ); 

  viewGetter.prototype.get = function(cb) 
  {
       return viewGetter.get(null, cb); //for the view
  };
  
    return viewGetter;

});

angular.module('CouchDB_ORDER', ['ngResource']).factory('orders', function($resource) 
{
  
  var orders = $resource(':protocol//:server/:db/:d/:v/:vv/:us', 
    {protocol: 'http:', server: 'localhost:5984', db:'seniordb', d:'_design', v:'view', vv:'_view', us:'orders'}, {update: {method:'PUT'} }
   ); 

  orders.prototype.get = function(cb) 
  {
       return orders.get(null, cb); //for the view
  };
  
    return orders;

});

angular.module('CouchDB33', ['ngResource']).factory('infoGetter', function($resource) 
{
  
  var infoGetter= $resource(':protocol//:server/:db/:d/:v/:vv/:us', 
    {protocol: 'http:', server: 'localhost:5984', db:'seniordb', d:'_design', v:'view', vv:'_view', us:'info'}, {update: {method:'PUT'} }
   ); 

  infoGetter.prototype.get = function(cb) 
  {
       return infoGetter.get(null, cb); //for the view
  };
  
    return infoGetter;
});

angular.module('CouchDB3333', ['ngResource']).factory('infoGetter3333', function($resource) 
{
  
  var infoGetter3333 = $resource(':protocol//:server/:db/:d/:v/:vv/:us', 
    {protocol: 'http:', server: 'localhost:5984', db:'seniordb', d:'_design', v:'view', vv:'_view', us:'checkPastinPastout'}, {update: {method:'PUT'} }
   ); 

  infoGetter3333.prototype.get = function(cb) 
  {
       return infoGetter3333.get(null, cb); //for the view
  };
  
    return infoGetter3333;
});



angular.module('CouchDB1', ['ngResource']).factory('ProjectCouch1', function($resource) 
{
  return $resource(':protocol//:server/:db/:d/:v', {protocol: 'http:', server: 'localhost:5984', db:'seniordb'}, {}, 
  {  query: { method: "POST" }
  });
});

angular.module('CouchDB1234', ['ngResource']).factory('ProjectCouch1234', function($resource) 
{
  return $resource(':protocol//:server/:db', {protocol: 'http:', server: 'localhost:5984', db:'seniordb'}, {}, 
  {  save: { method: "POST" }
  });
});

angular.module('CouchDB0', ['ngResource']).factory('ProjectCouch0', function($resource) 
{
  return $resource(':protocol//:server/:db/:d/:v', {protocol: 'http:', server: 'localhost:5984', db:'seniordb'}, {}, 
  {  query: { method: "GET" }
  });
});




angular.module('CouchDB66', ['ngResource']).factory('ProjectCouch66', function($resource, $routeParams) 
{
  
  var ProjectCouch66 = $resource(':protocol//:server/:db/:q', 
    {protocol: 'http:', server: 'localhost:5984', db:'seniordb'}, {update: {method:'PUT'} }
   ); 


   ProjectCouch66.prototype.update = function(cb) 
   {
      //alert(this.email);
      return ProjectCouch66.update({q: this._id, rev: this._rev}, this, cb);
   };

  ProjectCouch66.prototype.destroy = function(cb) 
  {
      return ProjectCouch66.remove({q: this._id, rev: this._rev}, cb);
  };

  ProjectCouch66.prototype.get = function(cb) 
  {
      return ProjectCouch66.get({q: this._id, rev: this._rev}, cb);
       //return ProjectCouch66.get(null, cb); //for the view
  };
  
    return ProjectCouch66;

});