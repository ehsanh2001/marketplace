"use strict";

const router = require("express").Router();
const multer = require("multer");
const { Category } = require("../../models");

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /api/categories
router.get("/", async (req, res) => {
  try {
    const categoriesData = await Category.findAll({ attributes: ["name"] });
    const categories = categoriesData.map((category) =>
      category.get({ plain: true })
    );

    res.render("categories", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: { name: req.params.name },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this name" });
      return;
    }

    const category = categoryData.get({ plain: true });
    res.setHeader("Content-Disposition", `inline; filename="${category.name}"`);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(category.image);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      image: req.file.buffer,
    });

    res.status(201).end();
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
