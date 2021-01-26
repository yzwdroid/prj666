const mysql = require("./helper/mysql_connection");

module.exports = {
  async CheckIfEmailExist(email) {
    sql = `SELECT * FROM Customers WHERE email = ?`;
    values = [email];
    mysql.client.execute(sql, values, (err, res) => {
      if (err) throw console.log(err);
      if (!Array.isArray(res) || !res.length) {
        console.log("Email not found.");
        return false;
      }
      return true;
    });
  },
  async CreateUser(body) {
    // TODO: First name & last name.
    first_name = "John";
    last_name = "Smith";
    sql = `INSERT INTO Customers (email, password, first_name, last_name)
        VALUES ( ?, ?, ?, ?)`;
    values = [body.email, body.password, first_name, last_name];
    mysql.client.execute(sql, values, (err, result) => {
      if (err) throw console.log(err);
    });
  },
  async FindUser(body) {
    sql = `SELECT * FROM Customers WHERE email = ?`;
    values = [body.email];
    try {
      let [rows, fields] = await mysql.client_promise.execute(sql, values);
      let user = {
        email: rows[0].email,
        password: rows[0].password,
      };
      return user;
    } catch (err) {
      console.log(err);
    }
  },
};
