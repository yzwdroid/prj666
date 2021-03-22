"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_Detail.init(
    {
      order_detail_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.UUID,
        references: {
          model: "Order",
          key: "order_id",
        },
      },
      customer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        referencess: {
          model: "Customer",
          key: "customer_id",
        }
      },
      shipment_id: {
        type: DataTypes.UUID,
        references: {
          model: "Shipment",
          key: "shipment_id",
        },
      },
      total_price: DataTypes.DOUBLE,
      discount: DataTypes.DOUBLE,
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Product",
          key: "product_id",
        },
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_Detail",
      indexes: [],
    }
  );
  return Order_Detail;
};
