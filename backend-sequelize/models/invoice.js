"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init(
    {
      invoice_id: { type: DataTypes.INTEGER, primaryKey: true },
      invoice_date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
      payment_method: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
