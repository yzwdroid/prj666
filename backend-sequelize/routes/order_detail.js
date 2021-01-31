const order_detailController = require("../controllers").order_detail;

module.exports = (app) => {
  app.get("/api/order_detail", order_detailController.findAll);
  app.get("/api/order_detail/:id", order_detailController.findOne);
  app.post("/api/order_detail", order_detailController.create);
  app.post("/api/order_detail/:id", order_detailController.update);
};
