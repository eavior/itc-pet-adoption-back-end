const express = require('express');
const {
  getAllPets,
  getSavedPets,
  getOwnedPets,
  getPet,
  updatePet,
  createPet,
  adoptPet,
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
  console.log(req.body);
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
  res.send({
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
router.post(
  '/picture_url',
  auth,
  // isSameUser,
  upload.single('image'),

  async (req, res) => {
    const result = await uploadToCloudinary(req.file.path);
    console.log(req.file.path);
    // console.log(result.secure_url);
    // await createPetPictureUrl(req.params.petId, result.secure_url);
    fs.unlinkSync(req.file.path);
    res.send({ picture_url: result.secure_url });
  }
);

// 5
router.get('/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  console.log('test' + petId);
  if (petId === 'all') {
    const results = await getAllPets();
    res.send({ pets: results });
  } else {
    const result = await getPet(petId);
    res.send({ pet: result });
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
  res.send({
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
  res.send({ searchResult: results });
});

// 8
router.put('/:petId/status', auth, async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;
  const { status } = req.body;
  console.log(status);
  const result = await adoptPet(petId, userId, status);
  res.send({ pet: result });
});

// 9
router.post('/:petId/save', auth, async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;
  const result = await savePet(petId, userId);
  res.send({ pet: result });
});

// 10
router.delete('/:petId/remove', auth, async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;
  const result = await removePet(petId, userId);
  res.send({ pet: result });
});

// 11
router.get('/user/:userId/owned', auth, async (req, res) => {
  const { userId } = req.params;
  const results = await getOwnedPets(userId);
  res.send({ owned: results });
});

// 12
router.get('/user/:userId/saved', auth, async (req, res) => {
  const { userId } = req.params;
  const results = await getSavedPets(userId);
  res.send({ saved: results });
});

// 17 => combined with #5

// 18
router.delete('/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  const result = await deletePet(petId);
  res.send({ message: 'This pet entry has been succesfully deleted' });
});

// 19
router.get('/save/:petId/current_user', auth, async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;
  const result = await saveStatus(petId, userId);
  res.send({ savedStatus: result });
});

module.exports = router;
