const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function getCurrentUser(userId) {
  return query(SQL`SELECT * FROM users WHERE id = ${userId}`);
}
exports.getCurrentUser = getCurrentUser;

function getUsers() {
  return query(SQL`SELECT * FROM users`);
}
exports.getUsers = getUsers;

function getUser(userId) {
  return query(SQL`SELECT * FROM users WHERE id = 'userId`);
}
exports.getUser = getUser;

function updateUser(
  userId,
  email,
  passwordHash,
  firstName,
  lastName,
  phoneNumber
) {
  return query(
    SQL`INSERT INTO users (email, password_hash, first_name, last_name, phone_number) VALUES (${email}, ${passwordHash}, ${firstName}, ${lastName}, ${phoneNumber}) WHERE id = 'userId`
  );
}
exports.updateUser = updateUser;

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
