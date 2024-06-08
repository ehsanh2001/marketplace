"use strict";

const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "image",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Image;
