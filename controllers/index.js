"use strict";

const router = require("express").Router();
const apiRoutes = require("./api");
<<<<<<< HEAD
//Get user routes 
const userRoutes = require('./api/user_routes')
const { Category, Item } = require("../models");
=======
const homeRoutes = require("./home_routes");
>>>>>>> 150dc61c9170d523989b3e53d3fc09baa8de2886

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
// use userRoutes
router.use('/api', userRoutes)


router.use((req, res, next) => {
  res.status(404).send("Sorry can't find the page you are looking for!");
});

module.exports = router;
