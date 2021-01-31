"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shipment.init(
    {
      shipment_id: { type: DataTypes.INTEGER, primaryKey: true },
      order_id: DataTypes.INTEGER,
      shipping_company: DataTypes.STRING,
      tracking_id: DataTypes.STRING,
      shipment_date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
      delivery_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Shipment",
    }
  );
  return Shipment;
};
