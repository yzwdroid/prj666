const shipmentController = require("../controllers").shipment;

module.exports = (app) => {
  app.get("/api/shipment", shipmentController.findAll);
  app.get("/api/shipment/:id", shipmentController.findOne);
  app.post("/api/shipment", shipmentController.create);
  app.post("/api/shipment/:id", shipmentController.update);
  app.delete("/api/shipment/:id", shipmentController.delete);
};
