const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function addUser(email, passwordHash) {
  return query(
    SQL`INSERT INTO users (email, password_hash) VALUES (${email}, ${passwordHash})`
  );
}
exports.addUser = addUser;

async function getUserByEmail(email) {
  const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`);
  return rows[0];
}
exports.getUserByEmail = getUserByEmail;
