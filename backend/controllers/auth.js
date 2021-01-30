const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const UserSql = require("./sql_auth");

module.exports = {
  async CreateUser(req, res) {
    let flag = await UserSql.CheckIfEmailExist(req.body.email);
    console.log(flag);
    if (flag) {
      return res.status(409).json({ message: "Email already exist" });
    }

    return bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({ message: "Error hashing password" });
      }
      const body = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      };
      UserSql.CreateUser(body)
        .then((user) => {
          res.status(201).json({ message: "User created successfully", user });
        })
        .catch(() => {
          res.status(500).json({ message: "Error occured for creating user" });
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
        if (bcrypt.compareSync(req.body.password, user.password)) {
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
 
    let user = await UserSql.FindUser(req.body);
    if (!user) {
      return res.status(409).json({ message: "Email does not exist" });
    }
    const resettoken = {
      email: req.body.email,
      token: crypto.randomBytes(16).toString("hex")
    }

    return UserSql.FreshToken(resettoken)
              .then(() => {
                res.status(200).json({ message: "Reset Password successfully." });
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
  async ValidPasswordToken(req, res) {
    if (!req.body.resettoken) {
      return res.status(500).json({ message: "Token is required" });
    }
    
    const result = await UserSql.ValidToken(req.body);
    
    if (result.length==0 || result[0].token != req.body.resettoken) {
      return res.status(409).json({ message: "Invalid URL" });
    }

    const user = await UserSql.FindUser(result[0]);
    
    if(user){
      res.status(200).json({ message: "Token verified successfully." });
    }
    else{
      return res.status(500).json({ message: "Token verified unsuccessfully." });
    }
  },
  async NewPassword(req, res) {
    
    const result = await UserSql.ValidToken(req.body);
    const findEmail = result[0].email;

    return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({ message: "Error hashing reset password" });
      }
      const data = {
        email: findEmail,
        password: hash,
      };

      UserSql.UpdatePassword(data)
        .then((user) => {
          res.status(201).json({ message: "Reset password successfully", user });
        })
        .catch(() => {
          res.status(500).json({ message: "Error occured for reseting password" });
        })

    });
  }
};
