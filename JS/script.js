
/* Get data from JSON*/

var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $http.get("data.json")
  .then(function (response) {$scope.cars = response.data;});
  $scope.sortPrice="price"; 
  $scope.selectedCar = {};

  $scope.openModal = function(car) {
    $scope.selectedCar = car;
    $('#modal').modal('show');
};       
});


/* Count vissitor*/
window.onload = function () {
  // Check if the key "visitorCount" exists in local storage
  if (localStorage.getItem("visitorCount") === null) {
    // If it doesn't exist, set it to 1
    localStorage.setItem("visitorCount", 1);
  } else {
    // If it does exist, retrieve its value, increment it by 1, and save it back to local storage
    let count = parseInt(localStorage.getItem("visitorCount"), 10);
    count = count + 1;
    localStorage.setItem("visitorCount", count);
  }

  // Display the visitor count on the page
  document.getElementById("count").innerHTML =
    localStorage.getItem("visitorCount");
};
/* End of visitor count*/


/* Function: Roll back to top */
  document.addEventListener("DOMContentLoaded", function() {
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      document.querySelector(".back-to-top").style.display = "block";
    } else {
      document.querySelector(".back-to-top").style.display = "none";
    }
  }

  document.querySelector(".back-to-top").addEventListener("click", function() {
    let start = window.pageYOffset;
    let end = 0;
    let duration = 500;
    let startTime = null;
    let ease = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(function animation(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = timestamp - startTime;
      let y = ease(progress, start, end - start, duration);
      window.scrollTo(0, y);
      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    });
  });
});
/* End of Roll back to top */
