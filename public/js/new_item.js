"use strict";

let imageFiles = [];

function removeImage(index) {
  imageFiles.splice(index, 1);
  renderImagePreviews();
  document.getElementById("image-upload-button").disabled = false;
}

function renderImagePreviews() {
  const previewsContainer = document.getElementById("image-previews");
  previewsContainer.innerHTML = ""; // Clear existing previews

  for (let index = 0; index < imageFiles.length; index++) {
    const file = imageFiles[index];
    const reader = new FileReader();
    reader.onload = function (e) {
      const prevImage = document.createElement("div");
      prevImage.classList.add("preview-image-container");
      prevImage.innerHTML = `
        <img src="${e.target.result}" class="thumbnail img-thumbnail">
        <button onclick="removeImage(${index})" type="button" class="btn btn-sm remove-preview" data-file-index="${index}">
          <span class="material-symbols-outlined">delete</span>
        </button>
      `;
      previewsContainer.appendChild(prevImage);
    };
    reader.readAsDataURL(file);
  }
}

function imageUploadChange(event) {
  const files = event.target.files;
  if (!files) return;
  imageFiles.push(files[0]);
  if (imageFiles.length >= 3) {
    document.getElementById("image-upload-button").disabled = true;
  }
  renderImagePreviews();

  // Clear the file input
  event.target.value = "";
}

async function formSubmit(event) {
  event.preventDefault();
  const formData = new FormData(this);
  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await fetch("/api/items", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Cannot create item. Please try again.");
      return;
    }
  } catch (err) {
    console.error(err);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("image-upload")
    .addEventListener("change", imageUploadChange);

  document
    .getElementById("freeCheckbox")
    .addEventListener("click", async function (event) {
      const priceInput = document.getElementById("price");
      priceInput.disabled = event.target.checked;
      priceInput.value = event.target.checked ? 0 : "";
    });

  document
    .getElementById("new-item-form")
    .addEventListener("submit", formSubmit);
});
