import db from "../db/db.js";

export const createUser = (user, callback) => {
  const { name, email, phone_number, company_name } = user;
  const query = `INSERT INTO user (name, email, phone_number, company_name) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, email, phone_number, company_name], function (err) {
    callback(err, this ? this.lastID : null);
  });
};

export const getAllUsers = (callback) => {
  db.all("SELECT * FROM user", [], (err, rows) => {
    callback(err, rows);
  });
};
