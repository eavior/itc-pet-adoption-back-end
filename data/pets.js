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

function getOwnedPets(userId) {
  return query(SQL`SELECT * FROM pets WHERE owner_id = ${userId}`);
}
exports.getOwnedPets = getOwnedPets;

function getSavedPets(userId) {
  // return query(SQL`SELECT * FROM saved_pets WHERE user_id = ${userId}`);
  return query(
    SQL`SELECT * FROM pets WHERE id IN (SELECT pet_id FROM saved_pets WHERE user_id = ${userId})`
  );
}
exports.getSavedPets = getSavedPets;

function getPet(petId) {
  return query(SQL`SELECT * FROM pets WHERE id = ${petId}`);
}
exports.getPet = getPet;

function deletePet(petId) {
  console.log(petId);
  return query(SQL`DELETE FROM pets WHERE id = ${petId}`);
}
exports.deletePet = deletePet;

function adoptPet(petId, userId, status) {
  const sql = SQL`UPDATE pets SET owner_id = ${userId}, status = ${status} WHERE id = ${petId};`;
  return query(sql);
}
exports.adoptPet = adoptPet;

function savePet(petId, userId) {
  const sql = SQL`INSERT INTO saved_pets (pet_id, user_id) VALUES (${petId}, ${userId})`;
  return query(sql);
}
exports.savePet = savePet;

function removePet(petId, userId) {
  console.log('remove');
  const sql = SQL`DELETE FROM saved_pets WHERE pet_id = ${petId} AND user_id = ${userId}`;
  return query(sql);
}
exports.removePet = removePet;

function saveStatus(petId, userId) {
  const sql = SQL`SELECT * FROM saved_pets WHERE pet_id = ${petId} AND user_id = ${userId}`;
  return query(sql);
}
exports.saveStatus = saveStatus;

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
  picture_url
) {
  const hypoallergenicINT = hypoallergenic ? 1 : 0;

  // const sql = SQL`UPDATE pets SET (name, type, breed, color, height, weight, hypoallergenic, diet, bio, picture_url) VALUES (${name}, ${type}, ${breed}, ${color}, ${height}, ${weight}, ${hypoallergenic}, ${diet}, ${bio}, ${pictureUrl}) WHERE id = ${petId};`;
  const sql = SQL`UPDATE pets SET name = ${name}, type = ${type}, breed = ${breed}, color =${color}, height =${height}, weight =${weight}, hypoallergenic =${hypoallergenicINT}, diet =${diet}, bio =${bio}, picture_url = ${picture_url} WHERE id = ${petId};`;
  return query(sql);
}
exports.updatePet = updatePet;

function createPet(
  name,
  type,
  breed,
  color,
  height,
  weight,
  hypoallergenic,
  diet,
  bio,
  picture_url
) {
  console.log(
    name,
    type,
    breed,
    color,
    height,
    weight,
    hypoallergenic,
    diet,
    bio,
    picture_url,
    'Test'
  );

  const sql = SQL`INSERT INTO pets (name, type, breed, color, height, weight, hypoallergenic, diet, bio, picture_url) VALUES (${name}, ${type}, ${breed}, ${color}, ${height}, ${weight}, ${hypoallergenic}, ${diet}, ${bio}, ${picture_url});`;

  return query(sql);
}
exports.createPet = createPet;

// function updatePetImage(userId, pictureUrl) {
//   const sql = SQL`UPDATE users SET picture_url = ${pictureUrl} WHERE id = ${userId}`;
//   return query(sql);
// }

// function createPetPictureUrl(petId, pictureUrl) {
//   const sql = SQL`UPDATE pets SET picture_url = ${pictureUrl} WHERE id = ${petId}`;
//   return query(sql);
// }
// exports.createPetPictureUrl = createPetPictureUrl;
