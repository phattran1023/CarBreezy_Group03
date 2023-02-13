var app = angular.module("myApp", ["ngRoute"]);
//1. setup Route
app.config([
  "$qProvider",
  function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  },
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./HTML/main.html",
    })
    .when("/shopCar", {
      templateUrl: "./HTML/shopCar.html",
      controller: "customersCtrl",
    })
    .when("/register", {
      templateUrl: "./HTML/register.html",
      controller: "customersCtrl",
    })
    .when("/login", {
      templateUrl: "./HTML/login.html",
      controller: "customersCtrl",
    });
});

//2.build controller
app.controller("customersCtrl", function ($scope, $http, $window) {
  $http.get("./db/data.json").then(function (response) {
    $scope.cars = response.data;
  });

  $scope.sortPrice = "price";
  $scope.selectedCar = {};
  $scope.openModal = function (car) {
    $scope.selectedCar = car;
    $("#modal").modal("show");
  };
});
