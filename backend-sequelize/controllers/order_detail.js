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
    const queryOne = Orders.findOne({
      where: { order_id: req.params.id },
    });

    const queryTwo = db.sequelize.query(
      `SELECT product_name, quantity, product_price
      FROM Order_Detail
      JOIN Product ON Order_Detail.product_id = Product.product_id
      WHERE order_id = ?`,
      {
        replacements: [req.params.id],
      }
    );

    return Promise.all([queryOne, queryTwo])
      .then((responses) => {
        product_array = [];
        responses[1][0].forEach((item) => {
          product_array.push({
            product_name: item.product_name,
            product_quantity: item.quantity,
            product_price: item.product_price,
          });
        });
        orders = {
          order_id: responses[0].order_id,
          order_date: responses[0].order_date,
          order_status: responses[0].order_status,
          order_number: responses[0].order_number,
          order_shipping_address_id: responses[0].order_shipping_address_id,
          products: product_array,
        };

        res.status(201).send(orders);
      })
      .catch((error) => console.log(error));

    // return Order_Detail.findOne({ where: { order_detail_id: req.params.id } })
    //   .then((order) => {
    //     if (!order) {
    //       res.status(201).send({ message: "No record found" });
    //     }
    //     res.status(201).send(order);
    //   })
    //   .catch((error) => res.status(400).json({ message: error }));
  },
  update(req, res) {
    return Order_Detail.findOne({ where: { order_detail_id: req.params.id } })
      .then((order) => {
        if (!order) {
          res.status(201).send({ message: "No record found" });
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
