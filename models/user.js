"use strict";

const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
    phone_email: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    geo_location: {
      type: DataTypes.GEOGRAPHY("POINT", 4326),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
    underscored: true,
  }
);

User.addHook("beforeCreate", async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
