"use strict";

const colors = require("colors");

function withAuth(req, res, next) {
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    next();
  }
}

module.exports = withAuth;
