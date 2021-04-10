const Product = require("../models").Product;
const uploadFile = require("../middleware/upload");

module.exports = {
  async create(req, res) {
    try {
      await uploadFile(req, res);
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }

      res.status(500).send({
        message: `Could not upload the file: ${req.body.product_img}. ${err}`,
      });
    }

    return Product.create({
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_description: req.body.product_description,
      product_img: res.req.file.filename,
      category: req.body.category,
      product_quantity: req.body.product_quantity,
    })
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).json({ message: error }));
  },
  findAll(req, res) {
    return Product.findAll()
      .then((product) => {
        res.status(201).send(product);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findPage(req, res) {
    console.log(req.query);
    page = Number(req.query.page);
    perPage = Number(req.query.perPage);
    category = req.query.category;
    console.log(page);
    console.log(perPage);
    console.log(category);

    if (+page && +perPage) {
      let filter = {};
      if (category) filter.category = category;

      page = +page - 1;
    }
    if (category) {
      return Product.findAll({
        limit: perPage,
        offset: page * perPage,
        where: { category: category },
      })
        .then((product) => {
          console.log(product);
          res.status(201).send(product);
        })
        .catch((error) => res.status(400).json({ message: "Error" }));
    }

    return Product.findAll({
      limit: perPage,
      offset: page * perPage,
      //where: { category: category },
    })
      .then((product) => {
        console.log(product);
        res.status(201).send(product);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    console.log(req.params.id);
    return Product.findOne({ where: { product_id: req.params.id } })
      .then((product) => {
        if (!product) {
          res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(product);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  async update(req, res) {
    try {
      await uploadFile(req, res);
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }

      res.status(500).send({
        message: `Could not upload the file: ${req.body.product_img}. ${err}`,
      });
    }
    if (req.body.product_img != null) {
      return Product.findOne({ where: { product_id: req.params.id } })
        .then((product) => {
          if (!product) {
            res.status(201).send({ message: "No record found" });
          }
          product
            .update({
              product_name: req.body.product_name,
              product_price: req.body.product_price,
              product_description: req.body.product_description,
              product_img: res.req.file.filename,
              category: req.body.category,
              product_quantity: req.body.product_quantity,
            })
            .then((update) => res.status(201).send(update))
            .catch((error) => res.status(400).json({ message: error }));
        })
        .catch((error) => res.status(400).json({ message: error }));
    } else {
      return Product.findOne({ where: { product_id: req.params.id } })
        .then((product) => {
          if (!product) {
            res.status(201).send({ message: "No record found" });
          }

          product
            .update({
              product_name: req.body.product_name,
              product_price: req.body.product_price,
              product_description: req.body.product_description,
              category: req.body.category,
              product_quantity: req.body.product_quantity,
            })
            .then((update) => res.status(201).send(update))
            .catch((error) => res.status(400).json({ message: error }));
        })
        .catch((error) => res.status(400).json({ message: error }));
    }
  },
  delete(req, res) {
    return Product.destroy({ where: { product_id: req.params.id } })
      .then(() => {
        res.status(200).json({ message: "product deleted successfully" });
      })
      .catch((error) => res.status(204).json({ message: "delete error" }));
  },
};
