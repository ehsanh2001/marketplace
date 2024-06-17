"use strict";

function showMessageModal(title, message) {
  const messageBox = document.getElementById("message-box-modal");
  messageBox.querySelector("#message-box-header").textContent = title;
  messageBox.querySelector("#message-box-body").textContent = message;
  const modal = new bootstrap.Modal(messageBox);
  modal.show();
}

function showConfirmationModal(message) {
  const messageBox = document.getElementById("confirm-box-modal");
  messageBox.querySelector("#confirm-box-header").textContent = "Delete Item";
  messageBox.querySelector("#confirm-box-body").textContent = message;
  const modal = new bootstrap.Modal(messageBox);
  modal.show();
  return messageBox;
}

document.addEventListener("DOMContentLoaded", function () {
  const confirmBoxYesBtn = document.getElementById("confirm-box-yes");
  const confirmBoxNoBtn = document.getElementById("confirm-box-no");

  confirmBoxYesBtn.addEventListener("click", function () {
    const result = document.getElementById("confirm-box-result");
    result.value = "yes";
  });

  confirmBoxNoBtn.addEventListener("click", function () {
    const result = document.getElementById("confirm-box-result");
    result.value = "no";
  });
});
