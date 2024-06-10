"use strict";

const sequelize = require("../config/connection");
const { Model, DataTypes, literal } = require("sequelize");

class Item extends Model {
  static async getNFreeItems(n) {
    try {
      const freeItemsData = await this.findAll({
        attributes: ["id", "title"],
        where: { price: 0 },
        order: [["created_at", "DESC"]],
        limit: n,
      });
      return freeItemsData.map((item) => item.get({ plain: true }));
    } catch (err) {
      console.error(err);
    }
  }
}

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
    freezeTableName: true,
  }
);

module.exports = Item;
