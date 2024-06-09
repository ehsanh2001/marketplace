"use strict";

const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find the page you are looking for!");
});

module.exports = router;
