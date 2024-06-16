"use strict";

const router = require("express").Router();
const { Category } = require("../models");
const Query = require("../models/queries");

// search based on term and location
// query: /api/item/term_location?term=term&lat=lat&lng=lng&radius=radius
router.get("/term_location", async (req, res) => {
  try {
    const items = await Query.searchItemsByTerm(req.query);
    const categories = await Category.getCategories();
    const data = {
      items,
      categories,
      term: req.query.term,
      radius: req.query.radius / 1000,
      username: req.session.username,
    };
    data.radius = data.radius < 1000 ? data.radius + " km radius" : "Anywhere";
    res.render("search_result", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// search based on category
// query: /api/item/search/category?category=category&lat=lat&lng=lng&radius=radius
router.get("/category", async (req, res) => {
  try {
    const items = await Query.searchItemsByCategory(req.query);
    const categories = await Category.getCategories();
    const data = {
      items,
      categories,
      term: req.query.term,
      radius: req.query.radius / 1000,
      username: req.session.username,
      category: req.query.category,
    };
    data.radius = data.radius < 1000 ? data.radius + " km radius" : "Anywhere";
    res.render("search_result", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// search based on item id
// query: /api/item/search/category?id=id&lat=lat&lng=lng&radius=radius
router.get("/id", async (req, res) => {
  try {
    let item = (await Query.searchItemsById(req.query))[0];
    // Add index to images for carousel
    item.images = item.images.map((image, index) => {
      return {
        id: image.id,
        index: index,
      };
    });

    const data = { item, username: req.session.username };
    res.render("item_details", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
