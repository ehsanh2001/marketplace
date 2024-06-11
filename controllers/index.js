"use strict";

const router = require("express").Router();
const apiRoutes = require("./api");
//mine
const userRoutes = require('./api/user_routes')
//mine 
const { Category, Item } = require("../models");

router.use("/api", apiRoutes);
//mine
router.use('/api', userRoutes)
//mine

// Home page
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

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find the page you are looking for!");
});

module.exports = router;
