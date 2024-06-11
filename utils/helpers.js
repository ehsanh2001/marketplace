function getImageIdFromIndex(array, index) {
  return array && array[index] && array[index].id;
}

module.exports = {
  getImageIdFromIndex,
};
