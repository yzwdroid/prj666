const Customer = require("../models").Customer;

module.exports = {
  create(req, res) {
    return Customer.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      billing_address_id: req.body.billing_address_id,
      shipping_address_id: req.body.shipping_address_id,
    })
      .then((customer) => res.status(201).send(customer))
      .catch((error) => res.status(400).json(error));
  },
  findAll(req, res) {
    return Customer.findAll()
      .then((customers) => {
        res.status(201).send(customers);
      })
      .catch((error) => res.status(400).json(error));
  },
  findOne(req, res) {
    return Customer.findOne({ where: { id: req.params.id } })
      .then((customer) => {
        if (!customer) {
          res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(customer);
      })
      .catch((error) => res.status(400).json(error));
  },
  update(req, res) {
    return Customer.findOne({ where: { id: req.params.id } })
      .then((customer) => {
        if (!customer) {
          res.status(201).send({ message: "No record found" });
        }
        const values = {
          email: req.body.email,
          password: req.body.password,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          billing_address_id: req.body.billing_address_id,
          shipping_address_id: req.body.shipping_address_id,
        };
        customer.update(values).then((update) => res.status(201).send(update));
      })
      .catch((error) => res.status(400).json(error));
  },
};
