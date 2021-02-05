const Token = require("../models").Token;

let constructor = (req) => {
  return {};
};

module.exports = {
  create(req, res) {
    return Token.create(constructor(req))
      .then((token) => res.status(201).send(token))
      .catch((error) => res.status(400).json({ message: error }));
  },
  findAll(req, res) {
    return Token.findAll()
      .then((token) => {
        res.status(201).send(token);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    return Token.findOne({ where: { token_id: req.params.id } })
      .then((token) => {
        if (!token) {
          res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(token);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  update(req, res) {
    return Token.findOne({ where: { token_id: req.params.id } })
      .then((token) => {
        if (!token) {
          res.status(201).send({ message: "No record found" });
        }
        const values = constructor(req);
        token
          .update(values)
          .then((update) => res.status(201).send(update))
          .catch((error) => res.status(400).json({ message: "Error" }));
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  delete(req,res) {
    return Token.destroy({where: { token_id: req.params.id }})
    .then(() => {
      res.status(200).json({ message: "token deleted successfully"})
    })
    .catch((error) => res.status(204).json({ message: "token delete error"}))
  },
  async freshToken(body){
    Token.findOne({ where: { email: body.email } })
      .then((token) => {
        if (!token) {
            Token.create(body)
            .then((token) => console.log("Insert token successfully!"))
            .catch((error) => console.log("fail to insert token!"));
        }
        else{
            token
            .update(body)
            .then((update) => console.log("Update token successfully!"))
            .catch((error) => console.log("Fail to update token!"));
        }

      })
      .catch((error) => console.log("Fresh token crash!"));
  },
  async validToken(req, res){
    console.log(req.body);
    if (!req.body.resettoken) {
      return res.status(500).json({ message: "Token is required" });
    }

    console.log(req.body.resettoken);
    const result =await Token.findOne({ where: { token: req.body.resettoken } });
    console.log(result);
    
    if (!result || result.token != req.body.resettoken) {
      return res.status(409).json({ message: "Invalid URL" });
    }

    const user = await Token.findOne({ where: { email: result.email } });
    
    if(user){
      return res.status(200).json({ message: "Token verified successfully." });
    }
    else{
      return res.status(500).json({ message: "Token verified unsuccessfully." });
    }
  }
};