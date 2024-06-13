"use strict";

async function login(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.ok) {
    window.location.href = "/dashboard";
  } else {
    //const data = await response.json();
    //alert("Invalid username or password");
    showMessageModal("Error", "Invalid username or password");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-form").addEventListener("submit", login);
});
