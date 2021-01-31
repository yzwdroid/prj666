const orderController = require("../controllers").order;

module.exports = (app) => {
  app.get("/api/order", orderController.findAll);
  app.get("/api/order/:id", orderController.findOne);
  app.post("/api/order", orderController.create);
  app.post("/api/order/:id", orderController.update);
};
