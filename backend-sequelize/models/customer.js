"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      customer_id: { type: DataTypes.INTEGER, primaryKey: true },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, unique: true, allowNull: false },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      billing_address_id: DataTypes.INTEGER,
      shipping_address_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
      indexes: [],
    }
  );
  return Customer;
};
