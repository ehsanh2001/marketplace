const router = require("express").Router();
const { item, image } = require("../../models");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { files: 3 },
});

//add items
router.post("/new/items", upload.array("images", 3), async (req, res) => {
  try {
    const newItem = await item.create(req.body);

    if (req.files) {
      for (const newFile of req.files) {
        await image.create({
          item_id: newItem.id,
          image: newFile.buffer,
        });
      }
    }

    res.status(200).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//update items
router.put("/new/items/:id", upload.array("images", 3), async (req, res) => {
  //logic for updating items
  try {
    const updateItems = await item.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.files) {
      await image.destroy({
        where: {
          item_id: req.params.id,
        },
      });

      for (const newFile of req.files) {
        await image.create({
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
router.delete("/new/items/:id", async (req, res) => {
  try {
    const deletedItem = await item.destroy({
      where: {
        id: req.params.id,
      },
    });

    await image.destroy({
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
