"use strict";

const router = require("express").Router();

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

module.exports = router;
