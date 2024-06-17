"use strict";

async function searchFormHandler(event) {
  event.preventDefault();

  const coords = JSON.parse(localStorage.getItem("coords"));
  if (!coords) {
    showMessageModal("Error", "Please select a location");
    return;
  }
  const { lat, lng } = coords;

  const term = document.querySelector("#search-term").value.trim();
  if (!term) {
    showMessageModal("Error", "Please enter a search term");
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
}

function searchRadiusInputHnadler(event) {
  const value = event.target.value;
  localStorage.setItem("radius", value);
}

function loadRadius() {
  const radius = parseInt(localStorage.getItem("radius"));
  console.log("radius = " + radius);
  const options = [...document.querySelectorAll("#search-radius option")];
  for (let op of options) {
    if (op.value == radius) {
      op.setAttribute("selected", true);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#search-btn")
    .addEventListener("click", searchFormHandler);

  document
    .getElementById("search-radius")
    .addEventListener("input", searchRadiusInputHnadler);
  //set adress if exists in local storage
  const coords = JSON.parse(localStorage.getItem("coords"));
  if (coords && coords.address) {
    document.querySelector("#search-location").textContent =
      "Location: " + coords.address.split(",")[0];
  }

  loadRadius();
});
