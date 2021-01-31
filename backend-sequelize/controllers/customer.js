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
      .then((Customer) => res.status(201).send(Customer))
      .catch((error) => res.status(400).send(error));
  },
  findAll() {
    const customer = Customer.findAll();
    return customer;
  },
};
