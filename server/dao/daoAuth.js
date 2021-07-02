"use strict";

const sqlite = require("sqlite3");
const bcrypt = require('bcrypt');

const db = new sqlite.Database("./db/survey.db", (err) => {
  if (err) throw err;
});

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: row.id , username: row.email };
        bcrypt.compare(password, row.password).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err)
          reject(err);
        else if (row === undefined)
          resolve({error: 'User not found.'});
        else {
          const user = {id: row.id, username: row.email, name: row.email}
          resolve(user);
        }
    });
  });
};
