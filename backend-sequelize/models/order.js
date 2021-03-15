"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      order_date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
      order_status: DataTypes.STRING,
      order_shipping_address_id: DataTypes.INTEGER,
      order_number: DataTypes.INTEGER,
      tax_rate: DataTypes.DOUBLE,
      order_total_plus_tax: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
