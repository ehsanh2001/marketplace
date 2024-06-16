"use strict";

const router = require("express").Router();
const { Category, Item, Image } = require("../../models");
const Query = require("../../models/queries");
const multer = require("multer");
const withAuth = require("../../utils/auth_middleware");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { files: 3 },
});

//add items
router.post("/", withAuth, upload.array("images", 3), async (req, res) => {
  try {
    const newItem = await Item.create(req.body);

    if (req.files) {
      for (const newFile of req.files) {
        await Image.create({
          item_id: newItem.id,
          image: newFile.buffer,
        });
      }
    }
    res.status(200).json(newItem);
    //res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//update items
router.put("/:id", withAuth, upload.array("images", 3), async (req, res) => {
  //logic for updating items
  try {
    const updateItems = await Item.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.files) {
      for (const newFile of req.files) {
        await Image.create({
          item_id: req.params.id,
          image: newFile.buffer,
        });
      }
    }

    res.status(200).json(updateItems);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//delete items
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedItem = await Item.destroy({
      where: {
        id: req.params.id,
      },
    });

    await Image.destroy({
      where: {
        item_id: req.params.id,
      },
    });

    res.status(200).json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
