const Order = require("../models").Order;

let constructor = (req) => {
  return {
    order_date: new Date(),
  };
};

module.exports = {
  create(req, res) {
    return Order.create(constructor(req))
      .then((order) => res.status(201).send(order))
      .catch((error) => res.status(400).json({ message: error }));
  },
  findAll(req, res) {
    return Order.findAll()
      .then((orders) => {
        res.status(201).send(orders);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    return Order.findOne({ where: { id: req.params.id } })
      .then((order) => {
        if (!order) {
          res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(order);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  update(req, res) {
    return Order.findOne({ where: { id: req.params.id } })
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
  delete(req,res) {
    return Order.destroy({where: { id: req.params.id }})
    .then(() => {
      res.status(200).json({ message: "order deleted successfully"})
    })
    .catch((error) => res.status(204).json({ message: "delete error"}))
  },
};
