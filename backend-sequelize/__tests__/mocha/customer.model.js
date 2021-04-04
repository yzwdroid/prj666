// testing the model

const CustomerModel = require("../../models/customer");

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} = require("sequelize-test-helpers");

describe("/models/customer", () => {
  const Customer = CustomerModel(sequelize, dataTypes);
  const customer = new Customer();

  checkModelName(Customer)("Customer");

  context("properties", () => {
    ["customer_id", "email", "password", "first_name", "last_name"].forEach(
      checkPropertyExists(customer)
    );
  });

  context("indexes", () => {
    ["email", "customer_id"].forEach(checkUniqueIndex(customer));
  });
});
