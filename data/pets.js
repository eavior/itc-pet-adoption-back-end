const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function getPets() {
  return query(SQL`SELECT * FROM pets`);
}
exports.getPets = getPets;

function createPet(name, type, status) {
  const sql = SQL`INSERT INTO pets (name, type, status) VALUES (${name}, ${type}, ${status});`;
  return query(sql);
}
exports.createPet = createPet;
