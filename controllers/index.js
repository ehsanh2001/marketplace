"use strict";

const router = require("express").Router();
const apiRoutes = require("./api");
const { Category, Item } = require("../models");

router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  try {
    const categories = await Category.getCategories();
    const freeItems = await Item.getNFreeItems(20);

    const data = { categories, freeItems };
    res.render("homepage", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.getCategories();

    res.render("categories", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find the page you are looking for!");
});

module.exports = router;
