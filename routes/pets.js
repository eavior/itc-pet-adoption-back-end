const express = require('express');
const {
  getAllPets,
  getSavedPets,
  getOwnedPets,
  getPet,
  updatePet,
  createPet,
} = require('../data/pets');
const { upload } = require('../middlewares/multipart');
const { auth } = require('../middlewares/auth');
const { uploadToCloudinary } = require('../lib/cloudinary');
const fs = require('fs');

const router = express.Router();

router.get('/owned/', auth, async (req, res) => {
  const userId = req.user.id;
  const results = await getOwnedPets(userId);
  res.send({ owned: results });
});

router.get('/saved/', auth, async (req, res) => {
  const userId = req.user.id;
  const results = await getSavedPets(userId);
  res.send({ saved: results });
});

router.get('/', async (req, res) => {
  const results = await getAllPets();
  res.send({ pet: results });
});

router.get('/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  console.log(petId);
  const result = await getPet(petId);
  res.send({ pet: result });
  console.log('2');
});

router.put('/:petId', async (req, res) => {
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
    pictureUrl,
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
    pictureUrl
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
      pictureUrl,
    },
  });
});

router.post('/', async (req, res) => {
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
    pictureUrl,
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
    pictureUrl
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
      pictureUrl,
    },
  });
});

// function isSameUser(req, res, next) {
//   if (req.user.id !== req.params.userId) {
//     res.status(403).send({ message: 'Only the same user can access' });
//     return;
//   }
//   next();
// }

router.put(
  '/:petId/picture_url',
  // auth,
  // isSameUser,
  upload.single('image'),
  async (req, res) => {
    const result = await uploadToCloudinary(req.file.path);
    await updatePetImage(req.params.petId, result.secure_url);
    fs.unlinkSync(req.file.path);
    res.send({ pictureUrl: result.secure_url });
  }
);

module.exports = router;
