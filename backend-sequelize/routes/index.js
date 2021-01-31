var fs = require("fs");

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to AHprinting API",
    })
  );

  fs.readdirSync(__dirname).forEach(function (file) {
    if (file == "index.js") return;
    var name = file.substr(0, file.indexOf("."));
    require("./" + name)(app);
  });
};
