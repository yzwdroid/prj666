const customerController = require("../controllers").customer;

module.exports = (app) => {
  app.get("/api/customer", customerController.findAll);
  app.get("/api/customer/:id", customerController.findOne);
  app.post("/api/customer", customerController.create);
  app.post("/api/customer/:id", customerController.update);
};
