"use strcit";

const router = require("express").Router();
const categoryRoutes = require("./category_routes");
const imageRoutes = require("./image_routes");

router.use("/images", imageRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
