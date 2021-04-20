const express = require('express');
const { getPets, createPet } = require('../data/pets');

const router = express.Router();

router.get('/', async (req, res) => {
  const results = await getPets();
  res.send({ pet: results });
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
    bio
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
    },
  });
});

module.exports = router;
