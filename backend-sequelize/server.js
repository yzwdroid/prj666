const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const models = require("./models");

models.sequelize
  .sync()
  .then(function () {
    console.log("Data base is working");
  })
  .catch(function (err) {
    console.log(err, "Something went wrong with the data base update");
  });

require("./routes")(app);
app.use("/api", express.static(__dirname + "/public"));

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to AH printing.",
  })
);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port);

module.exports = app;
