const slider = document.querySelector(".slider");
const firstSlideWidth = slider.querySelector(".slide").offsetWidth;

document.addEventListener("DOMContentLoaded", function () {
  function slidePrev() {
    slider.scrollLeft += firstSlideWidth;
  }

  function slideNext() {
    slider.scrollLeft -= firstSlideWidth;
  }

  document.getElementById("prev-button").addEventListener("click", slidePrev);
  document.getElementById("next-button").addEventListener("click", slideNext);
});
