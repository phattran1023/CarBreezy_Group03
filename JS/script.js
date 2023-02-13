

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

/* Scroll to top */
document.addEventListener("DOMContentLoaded", function() {
  const backToTopButton = document.querySelector(".back-to-top");

  backToTopButton.addEventListener("click", function(event) {
    event.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
});




