"use strict";

async function deleteItem(event) {
  const modal = showConfirmationModal(
    "Are you sure you want to delete this item?"
  );

  // Wait for the modal to be hidden
  modal.addEventListener("hidden.bs.modal", async () => {
    // Get the result of the modal
    const confirmResult = document.getElementById("confirm-box-result").value;
    if (confirmResult !== "yes") {
      return;
    }
    // Get the item ID from the parent with the delete-item class
    const deleteBtn = findParentWithClass(event.target, "delete-item");
    const itemId = deleteBtn.getAttribute("data-item-id");

    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        showMessageModal("Error", "Failed to delete item");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  });
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
