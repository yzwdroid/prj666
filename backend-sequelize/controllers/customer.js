const Customer = require("../models").Customer;

let constructor = (req) => {
  return {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    billing_address_id: req.body.billing_address_id,
    shipping_address_id: req.body.shipping_address_id,
  };
};

module.exports = {
  create(req, res) {
    return Customer.create(constructor(req))
      .then((customer) => res.status(201).send(customer))
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findAll(req, res) {
    return Customer.findAll()
      .then((customers) => {
        res.status(201).send(customers);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    return Customer.findOne({ where: { id: req.params.id } })
      .then((customer) => {
        if (!customer) {
          res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(customer);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  update(req, res) {
    return Customer.findOne({ where: { id: req.params.id } })
      .then((customer) => {
        if (!customer) {
          res.status(201).send({ message: "No record found" });
        }
        const values = constructor(req);
        customer
          .update(values)
          .then((update) => res.status(201).send(update))
          .catch((error) => res.status(400).json({ message: "Error" }));
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
};
