const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const scrollContainer = document.querySelector(".scroll-container");
const SCROOL_VALUE = scrollContainer.offsetWidth / 2;

function scrollLeft() {
  if (scrollContainer.scrollLeft == 0) return;
  scrollContainer.scrollBy({
    left: -1 * SCROOL_VALUE,
    behavior: "instant",
  });
}

function scrollRight() {
  let shift = SCROOL_VALUE;
  // if the scroll is at the end of the container
  if (
    scrollContainer.scrollLeft + SCROOL_VALUE + scrollContainer.offsetWidth >=
    scrollContainer.scrollWidth
  ) {
    // shift to the end of the container which maybe less than SCROOL_VALUE
    shift = scrollContainer.scrollWidth - scrollContainer.scrollLeft;
  }
  scrollContainer.scrollBy({
    left: shift,
    behavior: "instant",
  });
}

function containerMouseEnter() {
  leftArrow.style.display = "flex";
  rightArrow.style.display = "flex";
}

function containerMouseLeave() {
  leftArrow.style.display = "none";
  rightArrow.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".scroll-parent")
    .addEventListener("mouseenter", containerMouseEnter);
  document
    .querySelector(".scroll-parent")
    .addEventListener("mouseleave", containerMouseLeave);

  leftArrow.addEventListener("click", scrollLeft);
  rightArrow.addEventListener("click", scrollRight);
  leftArrow.addEventListener("dblclick", scrollLeft);
  rightArrow.addEventListener("dblclick", scrollRight);
});
