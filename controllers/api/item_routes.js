"use strict";

const router = require("express").Router();
const { Category, Item } = require("../../models");
const { searchItems, searchItemsByCategory } = require("../../models/queries");

// search based on term and location
// query: /api/item/term_location?term=term&location=location&radius=radius
router.get("/search/term_location", async (req, res) => {
  try {
    const data = await searchItems(req.query);
    console.dir(data);
    res.render("search_result", {
      data,
      term: req.query.term,
      radius: req.query.radius / 1000,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// search based on category
router.get("/search/category/:name", async (req, res) => {
  try {
    const data = await searchItemsByCategory(req.params.name);
    res.render("search_result", { data, category: req.params.name });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
