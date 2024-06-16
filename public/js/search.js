"use strict";

const searchFormHandler = async (event) => {
  event.preventDefault();

  const coords = JSON.parse(localStorage.getItem("coords"));
  if (!coords) {
    alert("Please enter a location to search for items");
    return;
  }
  const { lat, lng } = coords;

  const term = document.querySelector("#search-term").value.trim();
  if (!term) {
    alert("Please enter a search term");
    return;
  }
  let radius = document.querySelector("#search-radius").value.trim();
  // Convert radius to meters
  radius = parseFloat(radius) * 1000;

  let url = new URL("/search/term_location", window.location.origin);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lng", lng);
  url.searchParams.append("term", term);
  url.searchParams.append("radius", radius);

  window.location.href = url;
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#search-btn")
    .addEventListener("click", searchFormHandler);

  //set adress if exists in local storage
  const coords = JSON.parse(localStorage.getItem("coords"));
  if (coords && coords.address) {
    document.querySelector("#search-location").textContent =
      "Location: " + coords.address.split(",")[0];
  }
});
