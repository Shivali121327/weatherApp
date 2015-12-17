// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

//SERVICES
weatherApp.service('cityService', function() {
    
    this.city = "New York, NY";
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK"},{ get: { method: "JSONP" }});
 $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2, appid: 'ae8ac2b5fc9f0fcad31e4cecfc72fbf1' });
    
     $scope.convertToFarenheit = function(degK){
        return   Math.round((1.8 * (degK - 273)) + 32);
    };

    $scope.convertToDate = function(dt){
        return new Date(dt*1000);
    };
    
}]);

