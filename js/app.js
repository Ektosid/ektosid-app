var myApp = angular.module('myApp',['ngRoute','applicationControllers', 'appFilters', 'lengthFilter', 'CouchDB0', 'CouchDB', 'CouchDB3', 'CouchDB1', 'CouchDB2', 'ngCookies', 'CouchDB33', 'CouchDB66', 'CouchDB1234', 'CouchDB3333', 'angular-md5', 'CouchDB_ORDER']);

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/profile',{
		templateUrl: 'partials/profile.html',
		controller: 'profileController'
	}).
	when('/wallet',{
		templateUrl: 'partials/wallet.html',
		controller: 'walletController'
	}).
	when('/pastinpastout',{
		templateUrl: 'partials/pastinpastout.html',
		controller: 'pastinpastoutController'
	}).
	when('/chart',{
		templateUrl: 'partials/chart.html',
		controller: 'chartController'
	}).
	when('/freeplaces',{
		templateUrl: 'partials/freeplaces.html',
		controller: 'freeplacesController'
	}).
	when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	}).
	when('/signup',{
		templateUrl: 'partials/signup.html',
		controller: 'signupController'
	}).
	otherwise({
		redirectTo: '/login'
	});

}]);

