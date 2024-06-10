"use strict";

const router = require("express").Router();
const apiRoutes = require("./api");
const { Category } = require("../models");

router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  try {
    // get categories from DB
    const categories = await Category.getCategories();
    res.render("homepage", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find the page you are looking for!");
});

module.exports = router;
