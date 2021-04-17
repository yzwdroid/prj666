const Shipment = require("../models").Shipment;

let constructor = (req) => {
  return {};
};

module.exports = {
  create(req, res) {
    return Shipment.create(constructor(req))
      .then((shipment) => res.status(201).send(shipment))
      .catch((error) => res.status(400).json({ message: error }));
  },
  findAll(req, res) {
    return Shipment.findAll()
      .then((shipment) => {
        res.status(201).send(shipment);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    return Shipment.findOne({ where: { shipment_id: req.params.id } })
      .then((shimpent) => {
        if (!shimpent) {
          return res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(shimpent);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  update(req, res) {
    return Shipment.findOne({ where: { shipment_id: req.params.id } })
      .then((shipment) => {
        if (!shipment) {
          return res.status(201).send({ message: "No record found" });
        }
        const values = constructor(req);
        shipment
          .update(values)
          .then((update) => res.status(201).send(update))
          .catch((error) => res.status(400).json({ message: "Error" }));
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  delete(req, res) {
    return Shipment.destroy({ where: { shipment_id: req.params.id } })
      .then(() => {
        res.status(200).json({ message: "Shipment deleted successfully" });
      })
      .catch((error) => res.status(204).json({ message: "delete error" }));
  },
};
