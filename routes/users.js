const express = require('express');
const bcrypt = require('bcrypt');
const { getUsers, addUser, getUserByEmail } = require('../data/users');

const router = express.Router();

router.get('/', async (req, res) => {
  const results = await getUsers();
  res.send({ user: results });
});

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) next(err);
    else {
      // const user = await getUserByEmail(email);
      // if (user) {
      //   res.status(403).send('user already exists with this email');
      //   return;
      // }
      await addUser(email, hash);
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
        res.send({
          user: {
            email: user.email,
            created_date: user.created_date,
            id: user.id,
          },
        });
      } else {
        res.status(401).send('Incorrect password');
      }
    }
  });
});

module.exports = router;
