const { query } = require('../lib/db');
const SQL = require('@nearform/sql');
const wildCard = '%';

function getAllPets() {
  return query(SQL`SELECT * FROM pets`);
}
exports.getAllPets = getAllPets;

function getSearchResult(name, type) {
  const nameWildCard = wildCard.concat(name, wildCard);
  const typeWildCard = wildCard.concat(type, wildCard);
  return query(
    SQL`SELECT * FROM pets WHERE name LIKE ${nameWildCard} AND type LIKE ${typeWildCard};`
  );
}
exports.getSearchResult = getSearchResult;

function getAdvancedSearchResult(name, type, status, height, weight) {
  const nameWildCard = wildCard.concat(name, wildCard);
  const typeWildCard = wildCard.concat(type, wildCard);
  const statusWildCard = wildCard.concat(status, wildCard);
  const heightWildCard = wildCard.concat(height, wildCard);
  const weightWildCard = wildCard.concat(weight, wildCard);
  return query(
    SQL`SELECT * FROM pets WHERE name LIKE ${nameWildCard} AND type LIKE ${typeWildCard} AND type LIKE ${statusWildCard} AND type LIKE ${heightWildCard} AND type LIKE ${weightWildCard};`
  );
}
exports.getAdvancedSearchResult = getAdvancedSearchResult;

function getAllPetsForCurrentUser(userId) {
  return query(SQL`SELECT * FROM pets WHERE owner_id = ${userId};`);
}
exports.getAllPetsForCurrentUser = getAllPetsForCurrentUser;

function getOwnedPets(userId) {
  return query(SQL`SELECT * FROM pets WHERE owner_id = ${userId};`);
}
exports.getOwnedPets = getOwnedPets;

function getSavedPets(userId) {
  return query(
    SQL`SELECT * FROM pets WHERE id IN (SELECT pet_id FROM saved_pets WHERE user_id = ${userId});`
  );
}
exports.getSavedPets = getSavedPets;

function getPet(petId) {
  return query(SQL`SELECT * FROM pets WHERE id = ${petId};`);
}
exports.getPet = getPet;

function deletePet(petId) {
  return query(SQL`DELETE FROM pets WHERE id = ${petId};`);
}
exports.deletePet = deletePet;

function adoptPet(petId, userId, status) {
  const sql = SQL`UPDATE pets SET owner_id = ${userId}, status = ${status} WHERE id = ${petId};`;
  return query(sql);
}
exports.adoptPet = adoptPet;

function returnPet(petId, status) {
  const sql = SQL`UPDATE pets SET owner_id = "", status = ${status} WHERE id = ${petId};`;
  return query(sql);
}
exports.returnPet = returnPet;

function savePet(petId, userId) {
  const sql = SQL`INSERT INTO saved_pets (pet_id, user_id) VALUES (${petId}, ${userId});`;
  return query(sql);
}
exports.savePet = savePet;

function removePet(petId, userId) {
  const sql = SQL`DELETE FROM saved_pets WHERE pet_id = ${petId} AND user_id = ${userId};`;
  return query(sql);
}
exports.removePet = removePet;

function saveStatus(petId, userId) {
  const sql = SQL`SELECT * FROM saved_pets WHERE pet_id = ${petId} AND user_id = ${userId};`;
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
  const sql = SQL`INSERT INTO pets (name, type, breed, color, height, weight, hypoallergenic, diet, bio, picture_url) VALUES (${name}, ${type}, ${breed}, ${color}, ${height}, ${weight}, ${hypoallergenic}, ${diet}, ${bio}, ${picture_url});`;
  return query(sql);
}
exports.createPet = createPet;
