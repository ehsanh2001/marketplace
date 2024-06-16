"use strict";

function showMessageModal(title, message) {
  const messageBox = document.getElementById("message-box-modal");
  messageBox.querySelector("#message-box-header").textContent = title;
  messageBox.querySelector("#message-box-body").textContent = message;
  const modal = new bootstrap.Modal(messageBox);
  modal.show();
}
