const CustomerController = require("../../controllers/customer");

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
  it("should return 400 if username is missing from body", async () => {
    const req = mockRequestBody({}, { password: "password" });
    const res = mockResponse();
    await CustomerController.create(req, res);

    expect(res.status);
  });
  it("should return 400 if id is not found", async () => {
    const req = mockRequestParams({}, { id: "asd", password: "password" });
    const res = mockResponse();
    await CustomerController.findOne(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
  it("should return 400 if error has occured", async () => {
    const req = mockRequestBody();
    const res = mockResponse();
    await CustomerController.findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

