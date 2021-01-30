const customersController = require("../controllers").customers;

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to AHprinting API",
    })
  );

  app.get("/api/customers", (req, res) => {
    res.status(200).send({
      message: "This route works",
    });
  });

  app.post("/api/customers", customersController.create);
};
