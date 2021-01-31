"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Category.init(
    {
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Product_Category",
    }
  );
  return Product_Category;
};
