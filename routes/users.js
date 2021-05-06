const express = require('express');
const bcrypt = require('bcrypt');
const {
  getUsers,
  addUser,
  getUserByEmail,
  updateUserData,
  updateUserEmail,
  updateUserPassword,
  getPetsForUser,
} = require('../data/users');
const jwt = require('jsonwebtoken');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  // const userId = req.user.id;
  const results = await getUsers();
  res.send({ user: results });
});

router.get('/:userId', auth, async (req, res) => {
  console.log('hello');
  const result = await getUser(req.params.userId);
  res.send({ user: results });
});

router.get('/:userId/full', auth, async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const result = await getPetsForUser(userId);
  res.send({ pets: result });
});

// router.put('/:userId', async (req, res) => {
//   const results = await updateUser(req.params.userId);
//   res.send({ user: results });
// });

router.put('/:userId', auth, async (req, res, next) => {
  console.log('test');
  const {
    bio,
    email,
    first_name,
    last_name,
    password,
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

  if (email !== '') {
    const user = await getUserByEmail(email);
    if (user) {
      res.status(403).send({
        message: 'There is already a user account with this email address',
      });
      return;
    }
    await updateUserEmail(req.params.userId, email, updated);
  }

  if (password !== '') {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) next(err);
      else {
        await updateUserPassword(req.params.userId, hash, updated);
      }
    });
  }

  res.send({
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

router.post('/signup', async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) next(err);
    else {
      const user = await getUserByEmail(email);
      if (user) {
        res.status(403).send({
          message: 'There is already a user account with this email address',
        });
        return;
      }
      await addUser(email, hash, firstName, lastName, phoneNumber);
      res.send({ user: { email } });
    }
  });
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(404).send('User not found with this email');
    return;
  }
  bcrypt.compare(password, user.password_hash, (err, result) => {
    if (err) next(err);
    else {
      if (result) {
        const token = jwt.sign({ id: user.id }, 'whatEVER');
        res.send({
          token,
          user: {
            email: user.email,
            created_date: user.created_date,
            id: user.id,
            role: user.role,
          },
        });
      } else {
        res.status(401).send({ message: 'Incorrect password' });
      }
    }
  });
});

function isSameUser(req, res, next) {
  if (req.user.id !== req.params.userId) {
    res.status(403).send({ message: 'Only the same user can access' });
    return;
  }
  next();
}

module.exports = router;
