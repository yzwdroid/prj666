const orderController = require("../controllers").orders;

module.exports = (app) => {
  app.get("/api/order", orderController.findAll);
  app.get("/api/order/:id", orderController.findOne);
  app.get("/api/paypal/:id", orderController.handleRequest);
  app.post("/api/order", orderController.create);
  app.post("/api/order/:id", orderController.update);
  app.delete("/api/order/:id", orderController.delete);
};
