"use strcit";

const router = require("express").Router();
const categoryRoutes = require("./category_routes");
const imageRoutes = require("./image_routes");
const userRoutes = require('./api/user_routes')

router.use("/images", imageRoutes);
router.use("/categories", categoryRoutes);
router.use('/api/users', userRoutes)

module.exports = router;
