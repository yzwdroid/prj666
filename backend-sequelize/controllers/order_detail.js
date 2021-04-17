const Order_Detail = require("../models").Order_Detail;
const Orders = require("../models").Orders;
const db = require("../models");

let constructor = (req) => {
  return {
    order_id: req.body.order_id,
    shipment_id: req.body.shipment_id,
    total_price: req.body.total_price,
    discount: req.body.discount,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  };
};

module.exports = {
  create(req, res) {
    return Order_Detail.create(constructor(req))
      .then((order) => res.status(201).send(order))
      .catch((error) => res.status(400).json({ message: error }));
  },
  findAll(req, res) {
    return Order_Detail.findAll()
      .then((orders) => {
        res.status(201).send(orders);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    const queryOne = db.sequelize.query(
      `SELECT *
      FROM Order_Detail
      JOIN Product ON Order_Detail.product_id = Product.product_id
      WHERE order_id = ?`,
      {
        replacements: [req.params.id],
      }
    );

    const queryTwo = db.sequelize.query(
      `SELECT *
      FROM Order_Detail
      JOIN Product ON Order_Detail.product_id = Product.product_id
      JOIN Orders ON Order_Detail.order_id = Orders.order_id
      JOIN Address ON Orders.order_shipping_address_id = Address.address_id
      JOIN Customer ON Orders.customer_id = Customer.customer_id
      WHERE Orders.order_id = ?`,
      {
        replacements: [req.params.id],
      }
    );

    return Promise.all([queryOne, queryTwo])
      .then((responses) => {
        // Note: this response returns a nested array of arrays of arrays 
        product_array = [];
        responses[0][0].forEach((item) => {
          product_array.push({
            product_name: item.product_name,
            product_quantity: item.quantity,
            product_price: item.product_price,
            product_img: item.product_img,
            product_description: item.product_description,
          });
        });
        const order_detail = {
          first_name: responses[1][0][0].first_name,
          last_name: responses[1][0][0].last_name,
          email: responses[1][0][0].email,
          order_id: responses[1][0][0].order_id,
          order_date: responses[1][0][0].order_date,
          order_status: responses[1][0][0].order_status,
          transaction_id: responses[1][0][0].transaction_id,
          order_total_plus_tax: responses[1][0][0].order_total_plus_tax,
          tax_rate: responses[1][0][0].tax_rate,
          address_line_1: responses[1][0][0].address_line_1,
          address_line_2: responses[1][0][0].address_line_2,
          city: responses[1][0][0].city,
          province: responses[1][0][0].province,
          postal_code: responses[1][0][0].postal_code,
          products: product_array,
        };

        res.status(201).send(order_detail);
      })
      .catch((error) => console.log(error));
  },
  update(req, res) {
    return Order_Detail.findOne({ where: { order_detail_id: req.params.id } })
      .then((order) => {
        if (!order) {
          return res.status(201).send({ message: "No record found" });
        }
        const values = constructor(req);
        order
          .update(values)
          .then((update) => res.status(201).send(update))
          .catch((error) => res.status(400).json({ message: "Error" }));
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
};
