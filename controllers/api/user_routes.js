const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models");

//Responsible for creating account
router.post("/signup", async (req, res) => {
  //logic for creating new user
  try {
    //get variables from req body
    const { username, password, phone_email, address, latitude, longitude } =
      req.body;

    //check if user exists by searching for username
    const existingUser = await User.findOne({ where: { username } });
    //if username exists, render message below
    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
    }

    //create new user
    const newUser = await User.create({
      username,
      password,
      phone_email,
      address,
      latitude,
      longitude,
    });
    //redirect to homepage once signup is successful
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//Responsible for user login
router.post("/login", async (req, res) => {
  //logic for user login
  try {
    //get username, password from req body
    const { username, password } = req.body;

    const currentUser = await User.findOne({ where: { username } });

    if (!currentUser) {
      return res.status(404).json({ message: "invalid username or password" });
    }

    const checkPassword = await bcrypt.compare(password, currentUser.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "invalid username or password" });
    }

    if (currentUser && checkPassword) {
      req.session.save(() => {
        req.session.logged_in = true;
        res.status(200).json({ message: "login successful" });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//route for user logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
