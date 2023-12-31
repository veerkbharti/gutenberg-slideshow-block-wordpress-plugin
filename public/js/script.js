document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slide-container");
  const slider = document.querySelector(".slider");
  const firstSlideWidth = slider.querySelector(".slide").offsetWidth;
  const allSlides = [...document.querySelectorAll(".slide")];

  let isDragging = false,
    startX,
    startScrollLeft,
    isAutoPlay = slider.getAttribute("data-autoplay") === "true" ? true : false,
    isInfiniteLoop =
      slider.getAttribute("data-infiniteloop") === "true" ? true : false,
    timeoutId;

  let slidePerView = Math.round(slider.offsetWidth / firstSlideWidth);

  allSlides
    .slice(-slidePerView)
    .reverse()
    .forEach((slide) => {
      slider.insertAdjacentHTML("afterbegin", slide.outerHTML);
    });

  allSlides.slice(0, slidePerView).forEach((slide) => {
    slider.insertAdjacentHTML("beforeend", slide.outerHTML);
  });

  slider.classList.add("no-transition");
  slider.scrollLeft = slider.offsetWidth;
  slider.classList.remove("no-transition");

  function slidePrev() {
    slider.scrollLeft -= firstSlideWidth + 16;
  }

  function slideNext() {
    slider.scrollLeft += firstSlideWidth + 16;
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

  const infiniteScroll = () => {
    if (!isInfiniteLoop) return;
    if (slider.scrollLeft === 0) {
      slider.classList.add("no-transition");
      slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
      slider.classList.remove("no-transition");
    } else if (
      Math.ceil(slider.scrollLeft) ===
      slider.scrollWidth - slider.offsetWidth
    ) {
      slider.classList.add("no-transition");
      slider.scrollLeft = slider.offsetWidth;
      slider.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!sliderContainer.matches(":hover")) autoPlay();
  };

  const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => (slider.scrollLeft += firstSlideWidth), 2500);
  };
  autoPlay();

  document.querySelector("#prev-button").addEventListener("click", slidePrev);
  document.querySelector("#next-button").addEventListener("click", slideNext);

  document.onkeydown = checkKey;

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  slider.addEventListener("scroll", infiniteScroll);

  sliderContainer.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  sliderContainer.addEventListener("mouseleave", autoPlay);
});
