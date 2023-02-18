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
    })
    .when("/gallery", {
      templateUrl: "./HTML/Gallary.html",
      controller: "customersCtrl",
    })
    .when("/new", {
      templateUrl: "./HTML/new.html",
      controller: "customersCtrl",
    })
    .when("/used", {
      templateUrl: "./HTML/used.html",
      controller: "customersCtrl",
    });
});

//2.build controller
app.controller("customersCtrl", function ($scope, $http, $window) {
  $http.get("./db/data.json").then(function (response) {
    $scope.cars = response.data;
  });
  /*  */
  $scope.sortPrice = "price";
  $scope.selectedCar = {};
  $scope.openModal = function (car) {
    $scope.selectedCar = car;
    $("#modal").modal("show");
  };

  $scope.cart = [];
  $scope.subtotal = 0;

  // Define the getSubtotal function to get the subtotal of all items in the cart
  $scope.getSubtotal = function () {
    $scope.subtotal = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      $scope.subtotal += $scope.cart[i].price * $scope.cart[i].quantity;
    }
  };

  // Define the addCart function to add an item to the cart
  $scope.addCart = function (carIndex) {
    var selectedCar = $scope.cars[carIndex];
    var foundItem = false;

    // Check if the selected item is already in the cart
    for (var i = 0; i < $scope.cart.length; i++) {
      if ($scope.cart[i].name === selectedCar.model) {
        foundItem = true;
        $scope.cart[i].quantity++;
        break;
      }
    }

    // If the selected item is not in the cart, add it
    if (!foundItem) {
      var item = {
        name: selectedCar.model,
        price: selectedCar.price,
        quantity: 1,
      };
      $scope.cart.push(item);
    }

    // Call the getSubtotal function to update the subtotal
    $scope.getSubtotal();
  };

  // Define the increaseQuantity function to increase the quantity of an item
  $scope.increaseQuantity = function (item) {
    item.quantity++;

    // Call the getSubtotal function to update the subtotal
    $scope.getSubtotal();
  };

  // Define the decreaseQuantity function to decrease the quantity of an item
  $scope.decreaseQuantity = function (item) {
    if (item.quantity > 0) {
      item.quantity--;

      // Call the getSubtotal function to update the subtotal
      $scope.getSubtotal();
    }
  };

  $scope.removeItem = function(item) {
    var index = $scope.cart.indexOf(item);
    if (index !== -1) {
      $scope.cart.splice(index, 1);
      $scope.getSubtotal();
    }
  };  

  // Define the getCartQuantity function to get the number of items in the cart
  $scope.getCartQuantity = function() {
    var quantity = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      quantity += $scope.cart[i].quantity;
    }
    return quantity;
  }
});
