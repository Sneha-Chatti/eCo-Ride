'use strict';

angular.module('ecoRideApp.login', ['ngRoute'])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/', { templateUrl: 'index.html' })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        })
        .otherwise({ redirectTo: '/login' });
}])

.controller('loginCtrl', [function() {

}]);