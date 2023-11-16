const slider = document.querySelector(".slider");
const firstSlideWidth = slider.querySelector(".slide").offsetWidth;

document.addEventListener("DOMContentLoaded", function () {
  function slidePrev() {
    slider.scrollLeft += firstSlideWidth;
  }

  function slideNext() {
    slider.scrollLeft -= firstSlideWidth;
  }

  const checkKey = (e) => {
    if (e.keyCode == "37") {
      slidePrev();
    } else if (e.keyCode == "39") {
      slideNext();
    }
  };

  document.querySelector("#prev-button").addEventListener("click", slidePrev);
  document.querySelector("#next-button").addEventListener("click", slideNext);

  document.onkeydown = checkKey;
});
