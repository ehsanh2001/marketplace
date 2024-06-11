"use strict";

const router = require("express").Router();
const apiRoutes = require("./api");
const { Category, Item, Image } = require("../models");

router.use("/api", apiRoutes);

async function getNFreeItems(n) {
  try {
    const freeItemsData = await Item.findAll({
      attributes: ["id", "title", "created_at"],
      where: { price: 0 },
      order: [["created_at", "DESC"]],
      limit: n,
      include: [{ model: Image, attributes: ["id"] }],
    });
    return freeItemsData.map((item) => item.get({ plain: true }));
  } catch (err) {
    console.error(err);
  }
}

// Home page
router.get("/", async (req, res) => {
  try {
    const categories = await Category.getCategories();
    const freeItems = await getNFreeItems(20);

    console.log("---------------------------");
    for (const item of freeItems) {
      console.log(item.images[0].id);
    }
    console.log("******************************");

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
