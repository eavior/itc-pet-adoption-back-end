const express = require('express');
const bcrypt = require('bcrypt');
const { getCurrentUser } = require('../data/users');
const jwt = require('jsonwebtoken');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  const results = await getCurrentUser(userId);
  res.send({ user: results });
});

module.exports = router;
