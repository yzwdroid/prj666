const productController = require("../controllers").product;

module.exports = (app) => {
  app.get("/api/products", productController.findAll);
  app.get("/api/product", productController.findPage);
  app.get("/api/product/:id", productController.findOne);
  app.post("/api/product", productController.create);
  app.post("/api/product/:id", productController.update);
  app.delete("/api/product/:id", productController.delete);
};
