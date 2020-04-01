'use strict';

// Declare app level module which depends on views, and components
var ecoRideApp = angular.module('ecoRideApp', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider, $rootScope) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/home', {
                    templateUrl: 'home.html',
                    controller: 'SpeechController',
                })
                .when('/login', {
                    templateUrl: '/login/login.html',
                    controller: 'LoginController',
                })
                .when('/register', {
                    templateUrl: '/login/register.html',
                    controller: 'LoginController'
                })
                .when('/shareRide', {
                    templateUrl: '/ride/shareRide.html',
                    controller: 'RideController'
                })
                .when('/bookRide', {
                    templateUrl: '/ride/bookRide.html',
                    controller: 'RideController'
                })
                .when('/rides', {
                    templateUrl: '/ride/rides.html',
                    controller: 'RideController'
                })
                .when('/profile', {
                    templateUrl: '/userProfile/myProfile.html',
                    controller: 'LoginController'
                })
                .when('/logout', {
                    templateUrl: '/home.html',
                    controller: 'LoginController'
                })
                .otherwise({ redirectTo: '/home' });
        }
    ]);
