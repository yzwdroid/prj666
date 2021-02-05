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
      token_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      token: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
