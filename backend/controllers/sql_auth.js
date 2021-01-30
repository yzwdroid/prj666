const { NewPassword } = require("./auth");
const mysql = require("./helper/mysql_connection");

module.exports = {
  async CheckIfEmailExist(email) {
    sql = `SELECT * FROM Customers WHERE email = ?`;
    values = [email];
    try{
      let [rows, fields] = await mysql.client_promise.execute(sql, values);
      if (rows.length == 0) {
        console.log("Email not found.");
        return false;
      }
      return true;
    }catch (err) {
      console.log(err);
    }
  },
  async CreateUser(body) {
    sql = `INSERT INTO Customers (email, password, first_name, last_name)
        VALUES ( ?, ?, ?, ?)`;
    values = [body.email, body.password, body.firstName, body.lastName];
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
        email: "",
        password: "",
      };
      if(rows.length>0){
        user.email = rows[0].email;
        user.password = rows[0].password;
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  async FindToken(body) {
    sql = `SELECT * FROM Tokens WHERE email = ?`;
    values = [body.email];
    try {
      let [rows, fields] = await mysql.client_promise.execute(sql, values);
      
      return rows;
    } catch (err) {
      console.log(err);
    }
  },
  async FreshToken(body) {
    try {
      let users = await this.FindToken(body);
      console.log(users);
      console.log(typeof(users));
      if(users.length>0){
        deleteSql = `DELETE FROM Tokens WHERE email = ?`;
        deleteValues = [body.email];
        mysql.client.execute(deleteSql, deleteValues, (err, result) => {
          if (err) throw console.log(err);
          console.log("Delete token successfully!");
        });
      }

      newSql = `INSERT INTO Tokens (email, token)
      VALUES ( ?, ? )`;
      newValues = [body.email, body.token];
      mysql.client.execute(newSql, newValues, (err, result) => {
        if (err) throw console.log(err);
        console.log("Insert token successfully!");
      });
    } catch (err) {
      console.log(err);
    }
  },
  async ValidToken(body) {
    sql = `SELECT * FROM Tokens WHERE token = ?`;
    values = [body.resettoken];
    console.log(values);
    try {
      let [rows, fields] = await mysql.client_promise.execute(sql, values);

      return rows;
    } catch (err) {
      console.log(err);
    }
  },
  async UpdatePassword(body) {
    sql = `UPDATE Customers SET password = ?
          WHERE email = ?`;
    values = [body.password, body.email];
    console.log(values);
    mysql.client.execute(sql, values, (err, result) => {
      if (err) throw console.log(err);
      console.log("Reset password successfully!");
    });
  }
};
