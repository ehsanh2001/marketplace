"use strict";

async function formSubmit(e) {
  e.preventDefault();
  const form = document.querySelector("#signup-form");

  const username = form.username.value;
  const password = form.password.value;
  const rePassword = form.re_password.value;
  const phoneEmail = form.phone_email.value;

  if (password !== rePassword) {
    showMessageModal("Error", "Passwords do not match", "danger");
    return;
  }

  const searchLocationBtn = document.querySelector("#search-location");
  if (searchLocationBtn.textContent.includes("Map")) {
    showMessageModal("Error", "Please select a location from the map", "danger");
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

  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.message === "signup successful") {
      showMessageModal("Success", "Signup successful! Redirecting to dashboard...", "success");
      setTimeout(() => {
        document.location.replace("/dashboard");
      }, 2000); // Redirect after 2 seconds
    } else {
      showMessageModal("Error", data.message || "Failed to sign up. Please try again.", "danger");
    }
  } catch (error) {
    console.error("Error:", error);
    showMessageModal("Error", "Failed to sign up. Please try again.", "danger");
  }
}

function showMessageModal(title, message, type) {
  const modalElement = document.getElementById("message-box-modal");
  const modalTitle = document.getElementById("message-box-header");
  const modalBody = document.getElementById("message-box-body");

  modalTitle.textContent = title;
  modalBody.textContent = message;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#signup-form");
  form.addEventListener("submit", formSubmit);
});

