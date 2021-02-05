const customerController = require("../controllers").customer;
const tokenController = require("../controllers").token;

module.exports = (app) => {
  app.get("/api/customer", customerController.findAll);
  app.get("/api/customer/:id", customerController.findOne);
  app.post("/api/customer", customerController.create);
  //app.post("/api/customer/:id", customerController.update);
  app.delete("/api/customer/:id", customerController.delete)
  app.post("/api/customer/register", customerController.create);
  app.post("/api/customer/login", customerController.login);
  app.post("/api/customer/req-reset-password", customerController.resetPassword);
  app.post("/api/customer/valid-password-token", tokenController.validToken);
  app.post("/api/customer/new-password", customerController.newPassword);

};
