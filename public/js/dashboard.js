"use strict";

async function deleteItem(event) {
  const deleteBtn = findParentWithClass(event.target, "delete-item");
  const itemId = deleteBtn.getAttribute("data-item-id");

  try {
    const response = await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Failed to delete item");
      return;
    }
  } catch (error) {
    console.error(error);
  }
}

async function editItem(event) {
  const editBtn = findParentWithClass(event.target, "edit-item");
  const itemId = editBtn.getAttribute("data-item-id");

  window.location.href = `/edit_item/${itemId}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const deleteButtons = [...document.querySelectorAll(".delete-item")];
  const editButtons = [...document.querySelectorAll(".edit-item")];

  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });

  editButtons.forEach((button) => {
    button.addEventListener("click", editItem);
  });
});
