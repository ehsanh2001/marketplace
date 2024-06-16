"use strict";

async function formSubmit(e) {
  e.preventDefault();
  const form = document.querySelector("#signup-form");

  const username = form.username.value;
  const password = form.password.value;
  const rePassword = form.re_password.value;
  const phoneEmail = form.phone_email.value;

  if (password !== rePassword) {
    showErrorModal("Passwords do not match");
    return;
  }

  const searchLocationBtn = document.querySelector("#search-location");
  if (searchLocationBtn.textContent.includes("Map")) {
    showErrorModal("Please select a location from the map");
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
      showSuccessModal("Signup successful! Redirecting to dashboard...");
      setTimeout(() => {
        document.location.replace("/dashboard");
      }, 2000); // Redirect after 2 seconds
    } else {
      showErrorModal(data.message || "Failed to sign up. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    showErrorModal("Failed to sign up. Please try again.");
  }
}

function showSuccessModal(message) {
  const successModal = new bootstrap.Modal(document.getElementById('successModal'), {
    backdrop: 'static', // Prevent closing modal on backdrop click
    keyboard: false // Prevent closing modal on ESC key
  });
  
  const successMessageElement = document.getElementById('successMessage');
  successMessageElement.textContent = message;
  
  successModal.show();
}

function showErrorModal(message) {
  const errorModal = new bootstrap.Modal(document.getElementById('errorModal'), {
    backdrop: 'static', // Prevent closing modal on backdrop click
    keyboard: false // Prevent closing modal on ESC key
  });
  
  const errorMessageElement = document.getElementById('errorMessage');
  errorMessageElement.textContent = message;
  
  errorModal.show();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#signup-form");
  form.addEventListener("submit", formSubmit);
});

