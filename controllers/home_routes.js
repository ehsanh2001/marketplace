"use strict";

const router = require("express").Router();
const { Category, Item } = require("../models");
const { getNFreeItems } = require("../models/queries");
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
    const data = { username: req.session.username };
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

module.exports = router;
