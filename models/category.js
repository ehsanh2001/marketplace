const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static async getCategories() {
    try {
      const categoriesData = await this.findAll({ attributes: ["name"] });
      return categoriesData.map((category) => category.get({ plain: true }));
    } catch (err) {
      console.error(err);
    }
  }
}

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
    freezeTableName: true,
  }
);

module.exports = Category;
