const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function getUser(userId) {
  return query(SQL`SELECT * FROM users WHERE id = ${userId}`);
}
exports.getUser = getUser;

function getUsers() {
  return query(SQL`SELECT * FROM users`);
}
exports.getUsers = getUsers;

// function getUser(userId) {
//   return query(SQL`SELECT * FROM users WHERE id = 'userId`);
// }
// exports.getUser = getUser;

function getPetsForUser(userId) {
  return query(SQL`SELECT * FROM pets WHERE owner_id = ${userId}`);
}
exports.getPetsForUser = getPetsForUser;

function updateUserData(
  userId,
  bio,
  email,
  first_name,
  last_name,
  phone_number,
  role,
  updated
) {
  console.log(
    'Start',
    userId,
    bio,
    email,
    first_name,
    last_name,
    phone_number,
    role,
    updated,
    'End'
  );
  const sql = SQL`UPDATE users SET bio = ${bio}, first_name = ${first_name}, last_name = ${last_name}, phone_number = ${phone_number}, role =${role}, updated = CURRENT_TIMESTAMP WHERE id = ${userId};`;
  return query(sql);
}
exports.updateUserData = updateUserData;

function updateUserEmail(userId, email, updated) {
  const sql = SQL`UPDATE users SET email = ${email}, updated = CURRENT_TIMESTAMP WHERE id = ${userId};`;
  return query(sql);
}
exports.updateUserEmail = updateUserEmail;

function updateUserPassword(userId, passwordHash, updated) {
  const sql = SQL`UPDATE users SET password_hash = ${passwordHash}, updated = CURRENT_TIMESTAMP WHERE id = ${userId};`;
  return query(sql);
}
exports.updateUserPassword = updateUserPassword;

function addUser(email, passwordHash, firstName, lastName, phoneNumber) {
  return query(
    SQL`INSERT INTO users (email, password_hash, first_name, last_name, phone_number) VALUES (${email}, ${passwordHash}, ${firstName}, ${lastName}, ${phoneNumber})`
  );
}
exports.addUser = addUser;

async function getUserByEmail(email) {
  const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`);
  return rows[0];
}
exports.getUserByEmail = getUserByEmail;
