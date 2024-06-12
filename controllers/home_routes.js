"use strict";

const router = require("express").Router();
const { Category, Item } = require("../models");
const { getNFreeItems, searchItems } = require("../models/queries");

// Home page
router.get("/", async (req, res) => {
  try {
    const categories = await Category.getCategories();
    const freeItems = await getNFreeItems(20);

    const data = { categories, freeItems };
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
router.get("/dashboard", async (req, res) => {
  try {
    const data = {};
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

// search page
router.get("/search", async (req, res) => {
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

module.exports = router;
