"use strict";

function itemClicked(e) {
  const coords = JSON.parse(localStorage.getItem("coords"));
  if (!coords) {
    alert("Please enter a location to search for items");
    return;
  }
  const { lat, lng } = JSON.parse(localStorage.getItem("coords"));
  // Get the category name
  const element = findParentWithClass(e.target, "item");
  const itemId = element.getAttribute("data-item-id");

  //  Get the radius in meters
  let radius = document.querySelector("#search-radius").value.trim();
  radius = parseFloat(radius) * 1000;

  let url = new URL("/api/items/search/id", window.location.origin);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lng", lng);
  url.searchParams.append("id", itemId);
  url.searchParams.append("radius", radius);

  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", () => {
  const items = [...document.querySelectorAll(".item")];

  items.forEach((item) => {
    item.addEventListener("click", itemClicked);
  });
});
