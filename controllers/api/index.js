"use strcit";

const router = require("express").Router();
const categoryRoutes = require("./category_routes");
const imageRoutes = require("./image_routes");
const itemRoutes = require("./item_routes");

router.use("/images", imageRoutes);
router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);

module.exports = router;
