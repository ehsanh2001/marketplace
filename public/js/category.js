"use strict";

function categoryClicked(e) {
  const coords = JSON.parse(localStorage.getItem("coords"));
  if (!coords) {
    alert("Please enter a location to search for items");
    return;
  }
  const { lat, lng } = JSON.parse(localStorage.getItem("coords"));
  // Get the category name
  const element = findParentWithClass(e.target, "category-item");
  const category = element.getAttribute("data-category-name");

  //  Get the radius in meters
  let radius = document.querySelector("#search-radius").value.trim();
  radius = parseFloat(radius) * 1000;

  let url = new URL("/search/category", window.location.origin);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lng", lng);
  url.searchParams.append("category", category);
  url.searchParams.append("radius", radius);

  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", () => {
  const categories = [...document.querySelectorAll(".category-item")];

  categories.forEach((item) => {
    item.addEventListener("click", categoryClicked);
  });
});
