var body = document.getElementById("body1");

window.onload = function() {
  body.addEventListener("keypress", function(event) {
    console.log("getting to event");
    if (event.keyCode === 32) {
      body.classList.remove("withImg");
    }
  });
};
