"use strict";

const router = require("express").Router();
const { Image } = require("../../models");

//  /api/images

// Each item can have multiple images.
// :image is the number of the image in the sequence of images for that item.
router.get("/:id", async (req, res) => {
  try {
    // Find all images for the item
    const imageData = await Image.findOne({
      where: {
        id: req.params.id,
      },
    });

    // If no images are found for the item, return a 404 error
    if (!imageData) {
      res.status(404).json({ message: "No image found with this id!" });
      return;
    }

    const image = imageData.get({ plain: true });
    // return the image data
    res.setHeader("Content-Disposition", `inline; filename="${image.id}"`);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(image.image);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
