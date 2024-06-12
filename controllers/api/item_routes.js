"use strict";

const router = require("express").Router();
const { Category, Item } = require("../../models");
const {
  searchItemsByTerm,
  searchItemsByCategory,
} = require("../../models/queries");

// search based on term and location
// query: /api/item/term_location?term=term&lat=lat&lng=lng&radius=radius
router.get("/search/term_location", async (req, res) => {
  try {
    const data = await searchItemsByTerm(req.query);
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
// query: /api/item/search/category?name=category&lat=lat&lng=lng&radius=radius
router.get("/search/category/", async (req, res) => {
  try {
    const data = await searchItemsByCategory(req.query);
    res.render("search_result", { data, category: req.params.name });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
