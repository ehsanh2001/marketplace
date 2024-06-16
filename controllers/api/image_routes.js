"use strict";

const router = require("express").Router();
const { Image } = require("../../models");
const withAuth = require("../../utils/auth_middleware");

//  /api/images

// Get image by id
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

// delete image by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const imageData = await Image.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no images are found for the item, return a 404 error
    if (!imageData) {
      res.status(404).json({ message: "No image found with this id!" });
      return;
    }

    res.status(204).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
