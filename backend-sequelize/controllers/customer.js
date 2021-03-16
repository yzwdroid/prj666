const Customer = require("../models").Customer;
const Token = require("../models").Token;
const sendToken = require("./token");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// let constructor = (req) => {
//   return {
//     email: req.body.email,
//     password: req.body.password,
//     first_name: req.body.firstName,
//     last_name: req.body.lastName,
//     billing_address_id: req.body.billing_address_id,
//     shipping_address_id: req.body.shipping_address_id,
//   };
// };

module.exports = {
  create(req, res) {
    return bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({ message: "Error hashing password" });
      }
      const body = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hash,
      };
      Customer.create(body)
        .then((user) => {
          res.status(201).json({ message: "User created successfully", user });
        })
        .catch(() => {
          res.status(500).json({ message: "Error occured for creating user" });
        });
    });

    // return Customer.create(constructor(req))
    //   .then((customer) => res.status(201).send(customer))
    //   .catch((error) => res.status(400).json({ message: "Error" }));
  },
  login(req, res) {
    console.log(req.body);

    let user;

    return Customer.findOne({ where: { email: req.body.email } })
      .then((customer) => {
        console.log(customer);
        if (!customer) {
          res
            .status(201)
            .send({
              message: "No customer found, please input correct email address.",
            });
        }
        user = customer.dataValues;
        console.log(user);
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).json({ message: "Login successfully.", user });
        } else {
          res.status(409).json({ message: "Password or email is wrong" });
        }
      })
      .catch((error) =>
        res.status(400).json({ message: "Crash for finding a customer." })
      );
  },
  async resetPassword(req, res) {
    if (!req.body.email) {
      return res.status(500).json({ message: "Email is required" });
    }

    let user = await Customer.findOne({ where: { email: req.body.email } });
    console.log(user);

    if (!user) {
      return res.status(409).json({ message: "Email does not exist" });
    }
    const resettoken = {
      email: req.body.email,
      token: crypto.randomBytes(16).toString("hex"),
    };

    return sendToken
      .freshToken(resettoken)
      .then(() => {
        res
          .status(200)
          .json({ message: "Send reset Password email successfully." });
        var mailOptions = {
          to: user.email,
          from: "lixiaoqity@gmail.com", //'your email'
          subject: "Node.js Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://localhost:4200/response-reset-password/" +
            resettoken.token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(
          "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"
        );
        sgMail
          .send(mailOptions)
          .then(() => {
            console.log("Send email successfully!");
          })
          .catch((err) => {
            console.log(`Error sending confirm email ${err}`);
          });
      })
      .catch(() => {
        res.status(500).json({ message: "Error occured for freshing token." });
      });
  },
  async newPassword(req, res) {
    console.log(req.body);
    const result = await Token.findOne({
      where: { token: req.body.resettoken },
    });
    const findEmail = result.email;

    return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error hashing reset password" });
      }

      Customer.findOne({ where: { email: findEmail } })
        .then((customer) => {
          if (!customer) {
            return res.status(201).send({ message: "No record found" });
          }
          const values = {
            email: findEmail,
            password: hash,
          };
          customer
            .update(values)
            .then((update) => {
              console.log("Update password successfully!");
              res
                .status(201)
                .json({ message: "Update password successfully!" });
            })
            .catch((error) => {
              console.log("Fail to update password!");
              res.status(400).json({ message: "Fail to update password!" });
            });
        })
        .catch((error) => {
          return res.status(400).json({ message: "Update password crash!" });
        });
    });
  },
  findAll(req, res) {
    return Customer.findAll()
      .then((customers) => {
        res.status(201).send(customers);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  findOne(req, res) {
    return Customer.findOne({ where: { id: req.params.id } })
      .then((customer) => {
        if (!customer) {
          res.status(201).send({ message: "No record found" });
        }
        res.status(201).send(customer);
      })
      .catch((error) => res.status(400).json({ message: "Error" }));
  },
  update(req, res) {
    console.log(req.body);
    return bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({ message: "Error hashing password" });
      }

      let values;
      if(req.body.password){
        values = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
        }
      }
      else{
        values = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email
        }
      }
      console.log(values);

      Customer.findOne({ where: { customer_id: req.params.id } })
      .then((customer) => {
        if (!customer) {
          res.status(201).send({ message: "No record found" });
        }
        customer
          .update(values)
          .then((update) => res.status(201).send(update))
          .catch((error) => res.status(400).json({ message: "Error" }));
      })
      .catch((error) => res.status(400).json({ message: "Error" }));

    });
    
  },
  delete(req, res) {
    return Customer.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(200).json({ message: "customer deleted successfully" });
      })
      .catch((error) => res.status(204).json({ message: "delete error" }));
  },
};
