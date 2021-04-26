const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function getAllPets() {
  return query(SQL`SELECT * FROM pets`);
}
exports.getAllPets = getAllPets;

function getAllPetsForCurrentUser(userId) {
  return query(SQL`SELECT * FROM pets WHERE owner_id = ${userId}`);
}
exports.getAllPetsForCurrentUser = getAllPetsForCurrentUser;

function getPet(petId) {
  return query(SQL`SELECT * FROM pets WHERE id = ${petId}`);
}
exports.getPet = getPet;

function updatePet(
  petId,
  name,
  type,
  breed,
  color,
  height,
  weight,
  hypoallergenic,
  diet,
  bio,
  pictureUrl
) {
  const sql = SQL`UPDATE pets (name, type, breed, color, height, weight, hypoallergenic, diet, bio, picture_url) VALUES (${name}, ${type}, ${breed}, ${color}, ${height}, ${weight}, ${hypoallergenic}, ${diet}, ${bio}, ${pictureUrl}) WHERE id = ${petId};`;
  return query(sql);
}
exports.updatePet = updatePet;

function createPet(
  petId,
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

// function updatePetImage(userId, pictureUrl) {
//   const sql = SQL`UPDATE users SET picture_url = ${pictureUrl} WHERE id = ${userId}`;
//   return query(sql);
// }

function updatePetImage(petId, pictureUrl) {
  const sql = SQL`UPDATE pets SET picture_url = ${pictureUrl} WHERE id = ${petId}`;
  return query(sql);
}
exports.updatePetImage = updatePetImage;
