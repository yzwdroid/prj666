const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/users");
const UserSql = require("./sql_auth");
const passwordResetToken = require("../models/resettoken");
module.exports = {
  async CreateUser(req, res) {
    if (await UserSql.CheckIfEmailExist(req.body.email)) {
      return res.status(409).json({ message: "Email already exist" });
    }

    return bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({ message: "Error hashing password" });
      }
      const body = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      };
      UserSql.CreateUser(body)
        .then((user) => {
          res.status(201).json({ message: "User created successfully", user });
        })
        .catch(() => {
          res.status(500).json({ message: "Error occured" });
        });
    });
  },
  async GetUser(req, res) {
    const user = await User.find();
    res.json(user);
  },
  async LoginUser(req, res) {
    try {
        let user = await UserSql.FindUser(req.body);
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                console.log("Password is correct");
            } else {
                console.log("Password is wrong");
            }
            res.status(200).json({ message: "Login successfully." });
        } else {
            return res.status(409).json({ message: "Password or email is wrong" });
        }
    } catch (err) {
        console.log(err);
    }
  },
  async ResetPassword(req, res) {
    if (!req.body.email) {
      return res.status(500).json({ message: "Email is required" });
    }
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(409).json({ message: "Email does not exist" });
    }
    var resettoken = new passwordResetToken({
      _userId: user._id,
      resettoken: crypto.randomBytes(16).toString("hex"),
    });
    console.log(resettoken);
    resettoken.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }
      passwordResetToken
        .find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } })
        .remove()
        .exec();
      res.status(200).json({ message: "Reset Password successfully." });
      // var transporter = nodemailer.createTransport({
      //     service: 'Gmail',
      //     port: 465,
      //     auth: {
      //         user: 'lixiaoqity@gmail.com',//'user'
      //         pass: 'lixiaoqi821102'//'password'
      //     }
      // });
      // var mailOptions = {
      //     to: user.email,
      //     from: 'lixiaoqity@gmail.com',//'your email'
      //     subject: 'Node.js Password Reset',
      //     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      //         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      //         'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
      //         'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      // }
      // transporter.sendMail(mailOptions, (err, info) => {
      // })
      var mailOptions = {
        to: user.email,
        from: "lixiaoqity@gmail.com", //'your email'
        subject: "Node.js Password Reset",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          "http://localhost:4200/response-reset-password/" +
          resettoken.resettoken +
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
    });
  },
  async ValidPasswordToken(req, res) {
    if (!req.body.resettoken) {
      return res.status(500).json({ message: "Token is required" });
    }
    const user = await passwordResetToken.findOne({
      resettoken: req.body.resettoken,
    });
    if (!user) {
      return res.status(409).json({ message: "Invalid URL" });
    }
    User.findOneAndUpdate({ _id: user._userId })
      .then(() => {
        res.status(200).json({ message: "Token verified successfully." });
      })
      .catch((err) => {
        return res.status(500).send({ msg: err.message });
      });
  },
  async NewPassword(req, res) {
    passwordResetToken.findOne(
      { resettoken: req.body.resettoken },
      function (err, userToken, next) {
        if (!userToken) {
          return res.status(409).json({ message: "Token has expired" });
        }

        User.findOne(
          {
            _id: userToken._userId,
          },
          function (err, userEmail, next) {
            if (!userEmail) {
              return res.status(409).json({ message: "User does not exist" });
            }
            return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Error hashing password" });
              }
              userEmail.password = hash;
              userEmail.save(function (err) {
                if (err) {
                  return res
                    .status(400)
                    .json({ message: "Password can not reset." });
                } else {
                  userToken.remove();
                  return res
                    .status(201)
                    .json({ message: "Password reset successfully" });
                }
              });
            });
          }
        );
      }
    );
  },
};
