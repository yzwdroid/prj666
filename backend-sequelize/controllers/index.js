const customer = require("./customer");
const orders = require("./orders");
const order_detail = require("./order_detail");
const shipment = require("./shipment");
const product = require("./product");
const token = require("./token");

module.exports = {
  customer: customer,
  orders: orders,
  order_detail: order_detail,
  shipment: shipment,
  product: product,
  token: token,
};
