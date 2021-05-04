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

router.get('/all/', auth, async (req, res) => {
  const results = await getAllPets();
  res.send({ pets: results });
});

router.get('/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  const result = await getPet(petId);
  res.send({ pet: result });
});

router.get('/save/:petId/user/:userId', auth, async (req, res) => {
  const { petId, userId } = req.params;
  const result = await saveStatus(petId, userId);
  res.send({ savedStatus: result });
});

router.put('/adopt/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  const { userId, status } = req.body;
  const result = await adoptPet(petId, userId, status);
  res.send({ pet: result });
});

router.post('/save/:petId/user/:userId', auth, async (req, res) => {
  const { petId, userId } = req.params;
  const result = await savePet(petId, userId);
  res.send({ pet: result });
});

router.delete('/remove/:petId/user/:userId', auth, async (req, res) => {
  const { petId, userId } = req.params;
  const result = await removePet(petId, userId);
  res.send({ pet: result });
});

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

router.delete('/:petId', auth, async (req, res) => {
  const { petId } = req.params;
  const result = await deletePet(petId);
  res.send({ message: 'This pet entry has been succesfully deleted' });
});

// function isSameUser(req, res, next) {
//   if (req.user.id !== req.params.userId) {
//     res.status(403).send({ message: 'Only the same user can access' });
//     return;
//   }
//   next();
// }

router.post(
  '/picture_url/',
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

module.exports = router;
