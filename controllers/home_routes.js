"use strict";

const router = require("express").Router();
const { Category, Item } = require("../models");
const {
  getNFreeItems,
  searchUserByUsername,
  searchItemsById,
} = require("../models/queries");
const withAuth = require("../utils/auth_middleware");

// Home page
router.get("/", async (req, res) => {
  try {
    const categories = await Category.getCategories();
    const freeItems = await getNFreeItems(20);

    const data = { categories, freeItems, username: req.session.username };
    res.render("homepage", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Category page
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.getCategories();

    res.render("categories", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const user = await searchUserByUsername(req.session.username);
    const data = { user, username: req.session.username };
    res.render("dashboard", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//login page
router.get("/login", async (req, res) => {
  try {
    const data = {};
    res.render("login", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//signup page
router.get("/signup", async (req, res) => {
  try {
    const data = {};
    res.render("signup", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// new item page
router.get("/new_item", withAuth, async (req, res) => {
  try {
    const categories = await Category.getCategories();
    const data = { categories, username: req.session.username };
    res.render("new_item", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// edit item page
router.get("/edit_item/:id", withAuth, async (req, res) => {
  try {
    // the searchItemsById function requires a location to search for items
    const item = await searchItemsById({
      id: req.params.id,
      lat: 0,
      lng: 0,
      radius: 9999999999999999, // just a big number
    });
    console.log("=============================");
    console.dir(item, { depth: 3 });
    const categories = await Category.getCategories();
    const data = { item: item[0], categories, username: req.session.username };
    res.render("edit_item", { data });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
