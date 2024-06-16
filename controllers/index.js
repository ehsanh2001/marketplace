"use strict";

const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home_routes");
const { Category, Item } = require("../models");
const searchItemRoutes = require("./search_items_routes");

router.use("/", homeRoutes);
router.use("/search", searchItemRoutes);
router.use("/api", apiRoutes);

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find the page you are looking for!");
});

module.exports = router;
