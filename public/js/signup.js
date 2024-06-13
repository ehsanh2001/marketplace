"use strict";

async function formSubmit(e) {
  e.preventDefault();
  const form = document.querySelector("#signup-form");

  const username = form.username.value;
  const password = form.password.value;
  const rePassword = form.re_password.value;
  const phoneEmail = form.phone_email.value;

  if (password !== rePassword) {
    alert("Passwords do not match");
    return;
  }

  const searchLocationBtn = document.querySelector("#search-location");
  if (searchLocationBtn.textContent.includes("Map")) {
    alert("Please select a location from the map");
    return;
  }
  // Create the User data object
  // Get the address, latitude, and longitude from the map
  const userData = {
    username,
    password,
    phone_email: phoneEmail,
    address: addressOutput.value,
    latitude: latOutput.value,
    longitude: lngOutput.value,
  };

  const response = await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    const data = await response.json();
    alert(data.message || "Failed to sign up. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#signup-form");
  form.addEventListener("submit", formSubmit);
});
