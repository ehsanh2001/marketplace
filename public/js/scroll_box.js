function findParentWithClass(element, className) {
  while (element && element !== document) {
    if (element.classList.contains(className)) {
      return element;
    }
    element = element.parentNode;
  }
  return null;
}

function scrollLeft(e) {
  const parent = findParentWithClass(e.target, "scroll-parent");
  const scrollContainer = parent.querySelector(".scroll-container");

  let shift = scrollContainer.offsetWidth / 2;

  if (scrollContainer.scrollLeft == 0) return;
  scrollContainer.scrollBy({
    left: -1 * shift,
    behavior: "smooth",
  });
}

function scrollRight(e) {
  const parent = findParentWithClass(e.target, "scroll-parent");
  const scrollContainer = parent.querySelector(".scroll-container");

  let shift = scrollContainer.offsetWidth / 2;
  // if the scroll is at the end of the container
  if (
    scrollContainer.scrollLeft + shift + scrollContainer.offsetWidth >=
    scrollContainer.scrollWidth
  ) {
    // shift to the end of the container which maybe less than SCROOL_VALUE
    shift = scrollContainer.scrollWidth - scrollContainer.scrollLeft;
  }
  scrollContainer.scrollBy({
    left: shift,
    behavior: "smooth",
  });
}

function containerMouseEnter(e) {
  e.target.querySelector(".left-arrow").style.display = "flex";
  e.target.querySelector(".right-arrow").style.display = "flex";
  // leftArrow.style.display = "flex";
  // rightArrow.style.display = "flex";
}

function containerMouseLeave(e) {
  e.target.querySelector(".left-arrow").style.display = "none";
  e.target.querySelector(".right-arrow").style.display = "none";
  // leftArrow.style.display = "none";
  // rightArrow.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const scrollParents = [...document.querySelectorAll(".scroll-parent")];
  scrollParents.map((container) => {
    container.addEventListener("mouseenter", containerMouseEnter);
    container.addEventListener("mouseleave", containerMouseLeave);
  });

  const leftArrows = [...document.querySelectorAll(".left-arrow")];
  leftArrows.map((leftArrow) => {
    leftArrow.addEventListener("click", scrollLeft);
    leftArrow.addEventListener("dblclick", scrollLeft);
  });

  const rightArrows = [...document.querySelectorAll(".right-arrow")];
  rightArrows.map((rightArrow) => {
    rightArrow.addEventListener("click", scrollRight);
    rightArrow.addEventListener("dblclick", scrollRight);
  });

  // leftArrow.addEventListener("click", scrollLeft);
  // rightArrow.addEventListener("click", scrollRight);
  // leftArrow.addEventListener("dblclick", scrollLeft);
  // rightArrow.addEventListener("dblclick", scrollRight);
});
