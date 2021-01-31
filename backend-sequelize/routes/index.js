const customerController = require("../controllers").customer;

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to AHprinting API",
    })
  );

  // get all customers
  app.get("/api/customers", (req, res) => {
    // res.status(200).send({
    //   message: "This route works",
    // });
    customerController.findAll().then((customers) => {
      console.log("get customers");
      res.json(customers);
    });
  });
  app.post("/api/customers", customerController.create);
};
