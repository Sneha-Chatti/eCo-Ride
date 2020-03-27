'use strict';

ecoRideApp.controller('LoginController',
    function LoginController($scope, $rootScope, LoginService) {

        // $rootScope.loggedIn = false;
        $scope.user = {};
        var loggedIn = localStorage.getItem("loggedIn");
        if (loggedIn != null && loggedIn.toString() == "true") {
            var username = localStorage.getItem("username");
            $scope.user = LoginService.getUser(username);
        }

        $scope.login = function(user, loginForm) {
            if (loginForm.$valid) {
                $scope.user = user;
                LoginService.isValid(user);

            } else
                $rootScope.loggedIn = false;
        }

        $scope.register = function(user, registerForm) {
            if (registerForm.$valid) {
                $scope.user = user;
                if (user.password === user.confirmPassword)
                    LoginService.createUser(user);
                else
                    alert("Passwords doesn't match");
            } else
                localStorage.setItem("loggedIn", false);
        }

        $scope.getProfile = function() {
            $scope.user = LoginService.getUser(localStorage.getItem("username"));
        }

        $scope.goToPage = function(pageName) {
            document.location.href = pageName;
            location.reload();
        }

        $scope.logout = function() {
            $rootScope.loggedInUser = null;
            localStorage.setItem("loggedIn", false);
            localStorage.setItem("username", "");
            $scope.user = null;
            LoginService.emptyRides();
        }
    }
)