const { spy } = require("sinon");
const proxyquire = require("proxyquire");
const { sequelize, Sequelize } = require("sequelize-test-helpers");
const Customer = require("../controllers/customer");

const mockRequestBody = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const mockRequestParams = (sessionData, params) => ({
  session: { data: sessionData },
  params,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Customer Controller functions", () => {
  test("should return 400 if username is missing from body", async () => {
    const req = mockRequestBody({}, { password: "password" });
    const res = mockResponse();
    await Customer.create(req, res);

    expect(res.status);
  });
  test("should return 400 if id is not found", async () => {
    const req = mockRequestParams({}, { id: "asd", password: "password" });
    const res = mockResponse();
    await Customer.findOne(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
  test("should return 400 if error has occured", async () => {
    const req = mockRequestBody();
    const res = mockResponse();
    await Customer.findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("models/customer", () => {
  const { DataTypes } = Sequelize;
  const CustomerFactory = proxyquire("../models/customer", {
    sequelize: Sequelize,
  });

  let Customer;

  beforeEach(() => {
    Customer = CustomerFactory(sequelize);
  });

  afterEach(() => {
    Customer.init.resetHistory();
  });

  it("called Customer.init with the correct parameters", () => {
    expect(Customer.init).to.have.been.calledWith(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Customer",
      }
    );
  });
});
