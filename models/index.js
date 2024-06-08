"use strict";

const sequelize = require("../config/connection");
const Category = require("./category");
const Image = require("./image");
const Item = require("./item");
const User = require("./user");

// User has many Items
User.hasMany(Item, {
  foreignKey: "username",
  onDelete: "CASCADE",
});
Item.belongsTo(User, {
  foreignKey: "username",
});

// Item has many Images
Item.hasMany(Image, {
  foreignKey: "item_id",
  onDelete: "CASCADE",
});

Image.belongsTo(Item, {
  foreignKey: "item_id",
});

// Category has many Items
Category.hasMany(Item, {
  foreignKey: "cat_name",
  onDelete: "CASCADE",
});

Item.belongsTo(Category, {
  foreignKey: "cat_name",
});

module.exports = { Category, Image, Item, User };
