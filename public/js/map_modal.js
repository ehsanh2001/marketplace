"use strict";

const output = document.querySelector("#output");
const latOutput = document.querySelector("#lat");
const lngOutput = document.querySelector("#lng");
const addressOutput = document.querySelector("#address");
let marker = null;
let map = null;

async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 43.658, lng: -79.45 },
    disableDoubleClickZoom: true,
  });

  // add a click event listener to the map
  map.addListener("dblclick", mapClicked);
}

function showPosition(latitude, longitude, address) {
  output.innerHTML = `<p>${address}</p>`;

  map.setCenter({ lat: latitude, lng: longitude });
  // remove the previous marker
  if (marker) {
    marker.setMap(null);
  }
  // add a new marker
  marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: "Your Location",
  });
}

async function reverseGeocode(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBnd5x8Z786gYbdf4FPLcAMcEDXAjT2Zt0`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const address = data.results[0].formatted_address;
      return address;
    } else {
      console.log("No results found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function mapClicked(event) {
  const clickedLocation = event.latLng;

  await setOutputValues(clickedLocation.lat(), clickedLocation.lng());
  map.setCenter(clickedLocation);

  showPosition(
    clickedLocation.lat(),
    clickedLocation.lng(),
    addressOutput.value
  );
}

async function setOutputValues(lat, lng) {
  latOutput.value = lat;
  lngOutput.value = lng;
  try {
    addressOutput.value = await reverseGeocode(lat, lng);
  } catch (error) {
    console.error("Error getting address:", error);
    addressOutput.value = "Unknown address";
  }
}
async function getMyPosition(event) {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    await setOutputValues(position.coords.latitude, position.coords.longitude);
    map.setZoom(15);
    const address = await reverseGeocode(
      position.coords.latitude,
      position.coords.longitude
    );
    showPosition(position.coords.latitude, position.coords.longitude, address);
  } catch (error) {
    console.log("Error getting position:", error);
  }
}

function setAdress() {
  const searchLocationBtn = document.querySelector("#search-location");
  const shortAddress = addressOutput.value.split(",")[0];
  searchLocationBtn.textContent = shortAddress;
}

document.addEventListener("DOMContentLoaded", async () => {
  await initMap();
  document.querySelector("#find-me").addEventListener("click", getMyPosition);
  document.querySelector("#set-location").addEventListener("click", setAdress);
});
