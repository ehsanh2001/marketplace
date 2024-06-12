"use strict";

const searchFormHandler = async (event) => {
  event.preventDefault();
  const { lat, lng } = JSON.parse(localStorage.getItem("coords"));
  const term = document.querySelector("#search-term").value.trim();
  let radius = document.querySelector("#search-radius").value.trim();
  // Convert radius to meters
  radius = parseFloat(radius) * 1000;

  let url = new URL("/search", window.location.origin);
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
  const { address } = JSON.parse(localStorage.getItem("coords"));
  if (address) {
    document.querySelector("#search-location").textContent =
      address.split(",")[0];
  }
});
