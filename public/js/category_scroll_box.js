"use strict";

function findParentWithClass(element, className) {
  while (element && element !== document) {
    if (element.classList.contains(className)) {
      return element;
    }
    element = element.parentNode;
  }
  return null;
}

function categoryClicked(e) {
  const element = findParentWithClass(e.target, "category-item");
  const category = element.getAttribute("data-category-name");
  window.location.href = `api/items/search/category/${category}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const categoryItems = [...document.querySelectorAll(".category-item")];

  categoryItems.forEach((item) => {
    item.addEventListener("click", categoryClicked);
  });
});
