const Product = require("../models").Product;

let constructor = (req) => {
  return {};
};

module.exports = {
  create(req, res) {
    return Product.create(constructor(req))
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

    if(+page && +perPage){
                    
      let filter = {}; 
      if(category) filter.category = category;

      page = (+page) - 1;                      
    }
    if (category) {
      return Product.findAll(
        {
          limit: perPage,
          offset: page * perPage,
          where: { category: category },
        }
      )
        .then((product) => {
          console.log(product);
          res.status(201).send(product);
        })
        .catch((error) => res.status(400).json({ message: "Error" }));
    }
    
    return Product.findAll(
        {
          limit: perPage,
          offset: page * perPage,
          //where: { category: category },
        }
      )
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
  update(req, res) {
    return Product.findOne({ where: { product_id: req.params.id } })
      .then((product) => {
        if (!product) {
          res.status(201).send({ message: "No record found" });
        }
        const values = constructor(req);
        product
          .update(values)
          .then((update) => res.status(201).send(update))
          .catch((error) => res.status(400).json({ message: "Error" }));
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  delete(req,res) {
    return Product.destroy({where: { product_id: req.params.id }})
    .then(() => {
      res.status(200).json({ message: "product deleted successfully"})
    })
    .catch((error) => res.status(204).json({ message: "delete error"}))
  },
};
