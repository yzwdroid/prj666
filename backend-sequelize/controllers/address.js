const Address = require("../models").Address;

let constructor = (req) => {
  return {};
};

module.exports = {
  create(req, res) {
    return Address.create(constructor(req))
      .then((address) => res.status(201).send(address))
      .catch((error) => res.status(400).json({ message: error }));
  },
  findAll(req, res) {
    return Address.findAll()
      .then((address) => {
        res.status(201).send(address);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    return Address.findOne({ where: { address_id: req.params.id } })
      .then((address) => {
        if (!address) {
          res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(address);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  update(req, res) {
    return Address.findOne({ where: { address_id: req.params.id } })
      .then((address) => {
        if (!address) {
          res.status(201).send({ message: "No record found" });
        }
        const values = constructor(req);
        address
          .update(values)
          .then((update) => res.status(201).send(update))
          .catch((error) => res.status(400).json({ message: "Error" }));
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  delete(req,res) {
    return Address.destroy({where: { address_id: req.params.id }})
    .then(() => {
      res.status(200).json({ message: "address deleted successfully"})
    })
    .catch((error) => res.status(204).json({ message: "delete error"}))
  },
};
