"use strict";

const router = require("express").Router();
const { Category, Item } = require("../../models");
const Query = require("../../models/queries");

// search based on term and location
// query: /api/item/term_location?term=term&lat=lat&lng=lng&radius=radius
router.get("/search/term_location", async (req, res) => {
  try {
    const data = await Query.searchItemsByTerm(req.query);
    const categories = await Category.getCategories();
    res.render("search_result", {
      data,
      categories,
      term: req.query.term,
      radius: req.query.radius / 1000,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// search based on category
// query: /api/item/search/category?category=category&lat=lat&lng=lng&radius=radius
router.get("/search/category/", async (req, res) => {
  try {
    const data = await Query.searchItemsByCategory(req.query);
    const categories = await Category.getCategories();
    res.render("search_result", {
      data,
      categories,
      category: req.query.category,
      radius: req.query.radius / 1000,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// search based on item id
// query: /api/item/search/category?id=id&lat=lat&lng=lng&radius=radius
router.get("/search/id", async (req, res) => {
  try {
    let item = (await Query.searchItemsById(req.query))[0];
    // Add index to images for carousel
    item.images = item.images.map((image, index) => {
      return {
        id: image.id,
        index: index,
      };
    });
    // res.json(item);
    // return;

    res.render("item_details", { item });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
