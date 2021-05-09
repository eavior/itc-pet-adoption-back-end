const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

async function checkIfAdmin(userId) {
  const sql = SQL`SELECT id FROM users WHERE id = ${userId} AND role = 'admin'`;
  const result = await query(sql);
  if (result[0].id == userId) return true;
  else return false;
}
exports.checkIfAdmin = checkIfAdmin;

function getUser(userId) {
  return query(SQL`SELECT * FROM users WHERE id = ${userId}`);
}
exports.getUser = getUser;

function getUsers() {
  return query(SQL`SELECT * FROM users`);
}
exports.getUsers = getUsers;

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
  const sql = SQL`UPDATE users SET bio = ${bio}, first_name = ${first_name}, last_name = ${last_name}, phone_number = ${phone_number}, role =${role}, updated = CURRENT_TIMESTAMP WHERE id = ${userId};`;
  return query(sql);
}
exports.updateUserData = updateUserData;

function updateUserRole(userId, role) {
  const sql = SQL`UPDATE users SET role =${role}, updated = CURRENT_TIMESTAMP WHERE id = ${userId};`;
  return query(role);
}
exports.updateUserRole = updateUserRole;

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

function deleteUser(userId) {
  return query(SQL`DELETE FROM user WHERE id = ${userId};`);
}
exports.deleteUser = deleteUser;
