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

export const getUserById = (id, callback) => {
  db.get("SELECT * FROM user WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};

export const deleteUserById = (id, callback) => {
  db.run("DELETE FROM user WHERE id = ?", [id], function (err) {
    callback(err, this ? this.changes : null);
  });
};

export const updateUserById = (id, user, callback) => {
  const allowedFields = ["name", "email", "phone_number", "company_name"];
  const fields = Object.keys(user).filter(
    (key) => allowedFields.includes(key) && user[key] !== undefined,
  );
  if (fields.length === 0) {
    // No valid fields to update
    return callback(null, 0);
  }
  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => user[field]);
  const query = `UPDATE user SET ${setClause} WHERE id = ?`;
  db.run(query, [...values, id], function (err) {
    callback(err, this ? this.changes : null);
  });
};
