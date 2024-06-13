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

document.addEventListener("DOMContentLoaded", async () => {
  const deleteButtons = [...document.querySelectorAll(".delete-item")];

  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
});
