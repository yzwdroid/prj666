"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init(
    {
      token_id: { type: DataTypes.INTEGER, primaryKey: true },
      email: { type: DataTypes.INTEGER, allowNull: false },
      token: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
