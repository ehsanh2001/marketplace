"use strict";

let imageFiles = [];
let serverImageIDs = [];
let deletedServerImageIDs = [];

function removeServerImage(index) {
  deletedServerImageIDs.push(serverImageIDs[index]);
  serverImageIDs.splice(index, 1);
  renderImagePreviews();
}

function renderServerImagePreviews() {
  const previewsContainer = document.getElementById("image-previews");
  previewsContainer.innerHTML = ""; // Clear existing previews

  for (let index = 0; index < serverImageIDs.length; index++) {
    const imageId = serverImageIDs[index];
    const prevImage = document.createElement("div");
    prevImage.classList.add("preview-image-container");
    prevImage.innerHTML = `
      <img src="/api/images/${imageId}" class="thumbnail img-thumbnail">
      <button onclick="removeServerImage(${index})" type="button" class="btn btn-sm remove-preview" data-file-index="${index}">
        <span class="material-symbols-outlined">delete</span>
      </button>
    `;
    previewsContainer.appendChild(prevImage);
  }
}

function removeImage(index) {
  imageFiles.splice(index, 1);
  renderImagePreviews();
  enableUploadButton();
}

function enableUploadButton() {
  const uploadButton = document.getElementById("image-upload-button");
  uploadButton.disabled = false;
  uploadButton.classList.add("btn-primary");
  uploadButton.classList.remove("btn-secondary");
}

function disableUploadButton() {
  const uploadButton = document.getElementById("image-upload-button");
  uploadButton.disabled = true;

  uploadButton.classList.remove("btn-primary");
  uploadButton.classList.add("btn-secondary");
}

function renderImagePreviews() {
  renderServerImagePreviews();
  const previewsContainer = document.getElementById("image-previews");
  // previewsContainer.innerHTML = ""; // Clear existing previews

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
  // Disable the upload button if there are already 3 images
  if (imageFiles.length + serverImageIDs.length >= 3) {
    disableUploadButton();
  }
  renderImagePreviews();

  // Clear the file input
  event.target.value = "";
}

async function formSubmitNew(event, form) {
  event.preventDefault();
  //if no image files are selected, do not submit the form
  if (imageFiles.length == 0) {
    alert("Please select at least one image.");
    return;
  }
  const formData = new FormData(form);
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

async function deletedServerImages() {
  for (let i = 0; i < deletedServerImageIDs.length; i++) {
    try {
      const response = await fetch(`/api/images/${deletedServerImageIDs[i]}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        alert("Cannot delete image. Please try again.");
        throw new Error("Cannot delete image");
      }
    } catch (err) {
      console.error(err);
    }
  }
}
async function formSubmitEdit(event, form) {
  event.preventDefault();
  //if no image files are selected, do not submit the form
  if (imageFiles.length + serverImageIDs.length === 0) {
    alert("Please select at least one image.");
    return;
  }

  const formData = new FormData(form);
  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  try {
    // Delete images that were removed
    await deletedServerImages();
    // Update the item
    const response = await fetch(`/api/items/${formData.get("item-id")}`, {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Cannot update item. Please try again.");
      return;
    }
  } catch (err) {
    console.error(err);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // serverImageFiles array is being populated in the edit_item.handlebars file
  // with the images' IDs from the item object
  renderImagePreviews();
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
});
