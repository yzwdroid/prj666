const addressController = require("../controllers").address;

module.exports = (app) => {
  app.get("/api/address", addressController.findAll);
  app.get("/api/address/:id", addressController.findOne);
  app.post("/api/address", addressController.create);
  app.post("/api/address/:id", addressController.update);
  app.delete("/api/address/:id", addressController.delete);
};
