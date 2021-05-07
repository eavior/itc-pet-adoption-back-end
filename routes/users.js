const express = require('express');
const bcrypt = require('bcrypt');
const {
  getUser,
  getUsers,
  getUserByEmail,
  updateUserData,
  updateUserEmail,
  updateUserPassword,
  getPetsForUser,
} = require('../data/users');
const jwt = require('jsonwebtoken');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// 13
router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  const results = await getUser(userId);
  res.status(200).send({ user: results });
});

// 14
router.put('/:userId', auth, async (req, res, next) => {
  const {
    bio,
    email,
    first_name,
    last_name,
    phone_number,
    role,
    updated,
  } = req.body;
  await updateUserData(
    req.params.userId,
    bio,
    email,
    first_name,
    last_name,
    phone_number,
    role,
    updated
  );
  res.status(200).send({
    user: {
      bio,
      email,
      first_name,
      last_name,
      phone_number,
      role,
      updated,
    },
    result: 'The user details have been updated succesfully',
  });
});

// 15
router.get('/', auth, async (req, res) => {
  // const userId = req.user.id;
  const results = await getUsers();
  res.status(200).send({ user: results });
});

// 16
router.get('/:userId/full', auth, async (req, res) => {
  const { userId } = req.params;
  const userData = await getUser(userId);
  const petData = await getPetsForUser(userId);
  res.status(200).send({ user: [userData], pets: [...petData] });
});

module.exports = router;
