ecoRideApp.factory('LoginService', function($http, $rootScope, $window) {

    return {
        isValid: function(user) {
            var isValidUSer = false;
            $http.get('/users')
                .success(function(data, status, headers, config) {
                    users = data;
                    angular.forEach(users, function(u) {
                        if ((user.username === u.username || user.username === u.email) && user.password === u.password) {
                            localStorage.setItem("loggedIn", true);
                            localStorage.setItem("username", u.username);
                            sessionStorage.setItem('car', u.car);
                            $rootScope.loggedInUser = u;
                            isValidUSer = true;
                            $("#successDialog").modal('show');
                            return true;
                        }
                    })
                    if (!isValidUSer)
                        $window.alert("Invalid credentials ");
                    return data;
                });

        },

        getUser: function(username) {
            $http.get('/users').then(function(response) { $rootScope.users = response.data; });
            angular.forEach($rootScope.users, function(u) {
                console.log(username);
                console.log(u.username);
                if (username === u.username) {
                    $rootScope.loggedInUser = u;
                    console.log("MATCHED*************************");
                    return u;
                }
            })
        },

        createUser: function(user) {
            var uname = user.username;
            var fname = user.fname;
            var lname = user.lname;
            var dob = user.DOB;
            var email = user.email;
            var password = user.password;
            var car = user.car;
            console.log(JSON.stringify(user));

            var isValidUSer = true;
            $http.get('/users')
                .success(function(data, status, headers, config) {
                    users = data;
                    angular.forEach(users, function(u) {
                        if (uname === u.username) {
                            isValidUSer = false;
                        }
                    })
                    if (!isValidUSer) {
                        $window.alert("User already existing");
                        return data;
                    } else {
                        $rootScope.userData = [
                            { name: "username", value: uname },
                            { name: "fname", value: fname },
                            { name: "lname", value: lname },
                            { name: "dob", value: dob },
                            { name: "email", value: email },
                            { name: "password", value: password },
                            { name: "car", value: car }
                        ];

                        $http.post('/users', $rootScope.userData).then(function(data) {
                            $rootScope.msg = 'Data saved';
                            console.log($rootScope.msg);
                        });
                        $rootScope.msg = 'Data sent: ' + JSON.stringify($rootScope.userData);
                        console.log($rootScope.msg);
                        alert("Hello " + uname + "! You have been successfully registered");
                        document.location.href = 'index.html';
                    }
                });
        },

        emptyRides: function() {
            $http.post('/emptyRides').then(function(data) {
                $scope.msg = 'Data deleted';
                console.log($scope.msg);
            });
            document.location.href = 'index.html';
        }
    };
});