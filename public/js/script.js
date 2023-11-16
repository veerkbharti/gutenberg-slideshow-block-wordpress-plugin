const slider = document.querySelector(".slider");
const firstSlideWidth = slider.querySelector(".slide").offsetWidth;

document.addEventListener("DOMContentLoaded", function () {
  let isDragging = false,
    startX,
    startScrollLeft;

  function slidePrev() {
    slider.scrollLeft += firstSlideWidth + 16;
  }

  function slideNext() {
    slider.scrollLeft -= firstSlideWidth + 16;
  }

  const checkKey = (e) => {
    if (e.keyCode == "37") {
      slidePrev();
    } else if (e.keyCode == "39") {
      slideNext();
    }
  };

  const dragStart = (e) => {
    isDragging = true;
    slider.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = slider.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    slider.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    slider.classList.remove("dragging");
  };

  document.querySelector("#prev-button").addEventListener("click", slidePrev);
  document.querySelector("#next-button").addEventListener("click", slideNext);

  document.onkeydown = checkKey;

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
});
