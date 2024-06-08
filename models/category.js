const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "category",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Category;
