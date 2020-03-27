'use strict';

angular.module('ecoRideApp.version', [
    'ecoRideApp.version.interpolate-filter',
    'ecoRideApp.version.version-directive'
])

.value('version', '0.1');