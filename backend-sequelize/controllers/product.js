const Product = require("../models").Product;

let constructor = (req) => {
  return {};
};

module.exports = {
  create(req, res) {
    return Product.create(constructor(req))
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).json({ message: error }));
  },
  findAll(req, res) {
    return Product.findAll()
      .then((product) => {
        res.status(201).send(product);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    return Product.findOne({ where: { product_id: req.params.id } })
      .then((product) => {
        if (!product) {
          res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(product);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  update(req, res) {
    return Product.findOne({ where: { product_id: req.params.id } })
      .then((product) => {
        if (!product) {
          res.status(201).send({ message: "No record found" });
        }
        const values = constructor(req);
        product
          .update(values)
          .then((update) => res.status(201).send(update))
          .catch((error) => res.status(400).json({ message: "Error" }));
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
};
