const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", function() {
  nav.classList.toggle("active");
  if (nav.classList.contains("active")) {
    hamburger.innerHTML = "&#10006;";
  } else {
    hamburger.innerHTML = "&#9776;";
  }
});