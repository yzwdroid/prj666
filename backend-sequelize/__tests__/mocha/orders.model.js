// testing the model

const OrdersModel = require("../../models/orders");

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} = require("sequelize-test-helpers");

describe("/models/order", () => {
  const Orders = OrdersModel(sequelize, dataTypes);
  const orders = new Orders();

  checkModelName(Orders)("Orders");

  context("properties", () => {
    ["order_id", "order_date", "order_status", "order_shipping_address_id", "order_number"].forEach(
      checkPropertyExists(orders)
    );
  });

  context("indexes", () => {
    ["order_id"].forEach(checkUniqueIndex(orders));
  });
});
