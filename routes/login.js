const express = require('express');
const bcrypt = require('bcrypt');
const { addUser, getUserByEmail } = require('../data/users');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 2
router.post('/', async (req, res, next) => {
  console.log('login mess');
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

module.exports = router;
