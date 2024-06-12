"use strcit";

const router = require("express").Router();
const categoryRoutes = require("./category_routes");
const imageRoutes = require("./image_routes");
<<<<<<< HEAD
const userRoutes = require('./api/user_routes')

router.use("/images", imageRoutes);
router.use("/categories", categoryRoutes);
router.use('/api/users', userRoutes)
=======
const itemRoutes = require("./item_routes");

router.use("/images", imageRoutes);
router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);
>>>>>>> 879783f2dd067c50d62e2b425ecea7c6f9084030

module.exports = router;
