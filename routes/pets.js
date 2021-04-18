const express = require('express');
const { getPets, createPet } = require('../data/pets');

const router = express.Router();

router.get('/', async (req, res) => {
  const results = await getPets();
  res.send({ pet: results });
});

router.post('/', async (req, res) => {
  const { name, type, status } = req.body;
  await createPet(name, type, status);
  res.send({ pet: { name, type, status } });
});

module.exports = router;
