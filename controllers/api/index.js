"use strcit";

const router = require("express").Router();
const categoryRoutes = require("./category_routes");

router.use("/categories", categoryRoutes);

module.exports = router;
