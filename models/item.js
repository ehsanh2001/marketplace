"use strict";

const sequelize = require("../config/connection");
const { Model, DataTypes, literal } = require("sequelize");

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cat_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_DATE"),
    },
  },
  {
    sequelize,
    modelName: "item",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Item;
