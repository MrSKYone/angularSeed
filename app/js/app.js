var app = angular.module('appname', [
  'ngRoute',
  'ngFileUpload',
  'ngSanitize',
  'ngCookies',
  'pascalprecht.translate'
]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $routeProvider

  // route for the home page
  .when('/', {
    templateUrl: 'pages/about.html',
    controller: 'aboutController'
  })

  // otherwise
  .otherwise({
    redirectTo: '/'
  });
}]);

//TRANSLATION LOCALES
app.config(['$translateProvider', function ($translateProvider) {
  // add translation table
  $translateProvider
    .translations('en', en_locale)
    .translations('fr', fr_locale)
    .preferredLanguage('en');
}]);

app.controller('aboutController', function($scope, $location, $http, Utils) {
  
  $scope.about = "test about message";

  // SERVICE DATA EX
  // Moods.getDisplay('true')
  //   .success(function(data) {
  //     //TODO: change for call integration
  //     var pending = [];
  //     for(var mood = 0; mood<data.length; mood++){
  //       if(data[mood].moodtype != 'itinerary'){
  //         pending.push(data[mood]);
  //       }
  //     }
  //     $scope.moods = pending;
  //     $scope.displayedMoods = $scope.moods;
  //   });
  
  
});
