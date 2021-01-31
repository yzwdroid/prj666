const customerController = require("../controllers").customer;

module.exports = (app) => {
  app.get("/api/customers", customerController.findAll);
  app.get("/api/customers/:id", customerController.findOne);
  app.post("/api/customers", customerController.create);
  app.post("/api/customers/:id", customerController.update);
};
