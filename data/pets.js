const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function getPets() {
  return query(SQL`SELECT * FROM pets`);
}
exports.getPets = getPets;

function createPet(
  name,
  type,
  breed,
  color,
  height,
  weight,
  hypoallergenic,
  diet,
  bio
) {
  const sql = SQL`INSERT INTO pets (name, type, breed, color, height, weight, hypoallergenic, diet, bio) VALUES (${name}, ${type}, ${breed}, ${color}, ${height}, ${weight}, ${hypoallergenic}, ${diet}, ${bio});`;
  return query(sql);
}
exports.createPet = createPet;
