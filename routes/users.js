const express = require('express');
const {
  getUser,
  getUsers,
  updateUserData,
  updateUserRole,
  deleteUser,
  getPetsForUser,
  checkIfAdmin,
} = require('../data/users');
const jwt = require('jsonwebtoken');
const { auth } = require('../middlewares/auth');

const router = express.Router();

function isSameUser(req, res, next) {
  if (req.user.id !== req.params.userId) {
    res
      .status(403)
      .send({ message: 'Only the logged in user can perform this action' });
    return;
  }
  next();
}

function isAdmin(req, res, next) {
  const userId = req.user.id;
  const admin = checkIfAdmin(userId);
  if (!admin) {
    res.status(403).send({
      message: 'Only administrators can perform this action',
    });
    return;
  }
  next();
}

// 13
router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  const results = await getUser(userId);
  res.status(200).send({ user: results });
});

// 14
router.put('/:userId', auth, isSameUser, async (req, res, next) => {
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
  const userId = req.user.id;
  const admin = await checkIfAdmin(userId);
  if (!admin) {
    res.status(403).send({
      message: 'Only administrators can perform this action.',
    });
    return;
  }
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

// 20
router.put('/:userId/admin', auth, isAdmin, async (req, res, next) => {
  const { role } = req.body;
  await updateUserRole(req.params.userId, role);
  res
    .status(200)
    .send({ result: 'The user details have been updated succesfully' });
});

// 21
router.delete('/:userId', auth, isAdmin, async (req, res) => {
  const { userId } = req.params;
  await deleteUser(userId);
  res
    .status(204)
    .send({ message: 'This user entry has been succesfully deleted' });
});
