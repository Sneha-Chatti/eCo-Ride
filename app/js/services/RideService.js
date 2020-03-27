ecoRideApp.factory('RideService', function($http, $rootScope, $window) {
    return {
        postRide: function(ride) {

            var rideData = [
                { name: "source", value: ride.source },
                { name: "destination", value: ride.destination },
                { name: "price", value: ride.price },
                { name: "capacity", value: ride.capacity },
                { name: "rideDate", value: ride.rideDate },
                { name: "carNumber", value: sessionStorage.getItem('car') }
            ];

            $http.post('/cars', rideData).then(function(data) {
                console.log('Data saved');
            });

            console.log('Data sent: ' + JSON.stringify(rideData));
            $window.alert("YOUR TRIP HAS BEEN POSTED!")
            document.location.href = 'index.html';
        },

        findRide: function(ride) {
            var rideFound = false;
            var i = 0;
            $http.get('/cars')
                .success(function(data, status, headers, config) {
                    rides = data;
                    var ridesAvailable = [];
                    angular.forEach(rides, function(r) {
                        if (ride.source == r.source && ride.destination == r.destination) {
                            rideFound = true;
                            ridesAvailable.push({
                                source: r.source,
                                destination: r.destination,
                                price: r.price,
                                capacity: r.capacity,
                                rideDate: r.rideDate,
                                carNumber: r.carNumber
                            });
                        }
                    })
                    console.log(ridesAvailable);
                    $http.post('/rides', ridesAvailable).then(function(data) {
                        console.log('Data saved');
                    });

                    if (rideFound === true) {
                        $window.alert("HURRAY! RIDE FOUND")
                        document.location.href = '#!/rides';
                    } else
                        $window.alert("SORRY! NO RIDES AVAILABLE");
                });
        },
        emptyRidesAvailable: function() {
            $http.post('/emptyRides').then(function(data) {
                $scope.msg = 'Data deleted';
                console.log($scope.msg);
            });
        }
    };
})