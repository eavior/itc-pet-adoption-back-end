const express = require('express');
const {
  getAllPets,
  getSavedPets,
  getOwnedPets,
  getPet,
  updatePet,
  createPet,
  adoptPet,
  returnPet,
  deletePet,
  savePet,
  removePet,
  saveStatus,
  getAdvancedSearchResult,
} = require('../data/pets');
const { upload } = require('../middlewares/multipart');
const { auth } = require('../middlewares/auth');
const { uploadToCloudinary } = require('../lib/cloudinary');
const fs = require('fs');

const router = express.Router();

// 3
router.post('/', auth, async (req, res) => {
  const {
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
  } = req.body;
  await createPet(
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
  );
  res.status(201).send({
    pet: {
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
    },
  });
});

// 4
router.post('/picture_url', auth, upload.single('image'), async (req, res) => {
  const result = await uploadToCloudinary(req.file.path);
  fs.unlinkSync(req.file.path);
  res.status(201).send({ picture_url: result.secure_url });
});

// 5
router.get('/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  if (petId === 'all') {
    const results = await getAllPets();
    res.status(200).send({ pets: results });
  } else {
    const result = await getPet(petId);
    res.status(200).send({ pet: result });
  }
});

// 6
router.put('/:petId', auth, async (req, res) => {
  const {
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
  } = req.body;
  await updatePet(
    req.params.petId,
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
  );
  res.status(200).send({
    pet: {
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
    },
  });
});

// 7
router.get('/?', auth, async (req, res) => {
  const { name, type, status, height, weight } = req.query;
  // const { status } = req.body;
  const results = await getAdvancedSearchResult(
    name,
    type,
    status,
    height,
    weight
  );
  res.status(200).send({ searchResult: results });
});

// 8 ADOPT & RETURN
router.put('/:petId/adopt', auth, async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;
  const { status } = req.body;
  const result = await adoptPet(petId, userId, status);
  res.status(200).send({ pet: result });
});

router.put('/:petId/return', auth, async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;
  const { status } = req.body;
  const result = await returnPet(petId, status);
  res.status(200).send({ pet: result });
});

// 9
router.post('/:petId/save', auth, async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;
  const result = await savePet(petId, userId);
  res.status(200).send({ pet: result });
});

// 10
router.delete('/:petId/save', auth, async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;
  const result = await removePet(petId, userId);
  res.status(200).send({ pet: result });
});

// 11
router.get('/user/:userId/owned', auth, async (req, res) => {
  const { userId } = req.params;
  const results = await getOwnedPets(userId);
  res.status(200).send({ owned: results });
});

// 12
router.get('/user/:userId/saved', auth, async (req, res) => {
  const { userId } = req.params;
  const results = await getSavedPets(userId);
  res.status(200).send({ saved: results });
});

// 17 => combined with #5

// 18
router.delete('/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  const result = await deletePet(petId);
  res
    .status(204)
    .send({ message: 'This pet entry has been succesfully deleted' });
});

// 19
router.get('/:petId/user/:userId', auth, async (req, res) => {
  const { petId, userId } = req.params;
  // const userId = req.user.id;
  const result = await saveStatus(petId, userId);
  res.status(200).send({ savedStatus: result });
});

module.exports = router;
