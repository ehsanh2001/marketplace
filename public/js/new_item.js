"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("image-upload")
    .addEventListener("change", function (event) {
      const previewsContainer = document.getElementById("image-previews");
      previewsContainer.innerHTML = ""; // Clear existing previews
      const files = event.target.files;

      if (files) {
        for (let i = 0; i < files.length && i < 3; i++) {
          const file = files[i];
          const reader = new FileReader();

          reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.className = "thumbnail img-thumbnail";
            previewsContainer.appendChild(img);
          };

          reader.readAsDataURL(file);
        }
      }
    });

  document
    .getElementById("freeCheckbox")
    .addEventListener("click", async function (event) {
      const priceInput = document.getElementById("price");
      priceInput.disabled = event.target.checked;
      priceInput.value = event.target.checked ? 0 : "";
    });
});
