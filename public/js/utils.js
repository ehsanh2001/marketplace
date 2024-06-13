"use strict";

function findParentWithClass(element, className) {
  while (element && element !== document) {
    if (element.classList.contains(className)) {
      return element;
    }
    element = element.parentNode;
  }
  return null;
}
