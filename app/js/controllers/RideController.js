ecoRideApp.controller('RideController',
    function RideController($scope, $rootScope, $http, RideService) {
        $scope.ride = {};
        $http.get('/cities')
            .then(function(response) {
                $rootScope.cities = response.data;
                $rootScope.dCities = response.data;
            });

        $http.get('/rides')
            .then(function(response) {
                $rootScope.ridesAvailable = response.data;
            });

        $scope.sourceSelectorChange = function(ride) {
            console.log("Source Selected; ", $scope.ride);
        };

        $scope.destinationSelectorChange = function(ride) {
            ride.destination = document.getElementById("destSelect").value;
            console.log("Destination Selected", $scope.ride);
        };

        $scope.postRide = function(ride, postRideForm) {
            if (postRideForm.$valid && localStorage.getItem("loggedIn").toString() == "true") {
                var srcSelected = JSON.parse(document.getElementById("sourceSelect").value);
                var destSelected = JSON.parse(document.getElementById("destSelect").value);
                ride.source = srcSelected['city'];
                ride.destination = destSelected['city'];
                if (ride.source === ride.destination)
                    alert("Source and destination cannot be the same");
                else
                    RideService.postRide(ride);
                document.getElementById("sourceSelect").value = "";
                document.getElementById("destSelect").value = "";
                ride = null;
            } else {
                alert("Please Login to Continue");
                document.location.href = '#!/login';
            }

        }

        $scope.findRide = function(ride, findRideForm) {
            RideService.emptyRidesAvailable();
            if (findRideForm.$valid && localStorage.getItem("loggedIn").toString() == "true") {
                var srcSelected = JSON.parse(document.getElementById("sourceSelect").value);
                var destSelected = JSON.parse(document.getElementById("destSelect").value);
                ride.source = srcSelected['city'];
                ride.destination = destSelected['city'];
                if (ride.source === ride.destination)
                    alert("Source and destination cannot be the same");
                else
                    RideService.findRide(ride);
                document.getElementById("sourceSelect").value = "";
                document.getElementById("destSelect").value = "";
            } else {
                alert("Please Login to Continue");
                document.location.href = '#!/login';
            }
        }

        $scope.bookRide = function() {
            if (localStorage.getItem("loggedIn")) {
                alert("RIDE BOOKED");
                RideService.emptyRidesAvailable();
                document.location.href = 'index.html';
            } else {
                alert("Please Login to Continue");
                document.location.href = '#!/login';
            }
        }
    })