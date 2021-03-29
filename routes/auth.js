const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

const router = express.Router();

router.post('/register', async (req, res) => {
  // Validate user data
  const { error } = registerValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //   Checking if the user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exist');

  //   Hash the password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Save new user
  try {
    await user.save();
    res.status(201).send('user registration successful');
  } catch (err) {
    res.send(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  // Validate login data
  const { error } = loginValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Checking if the user already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('User does not exist');

  // Validating password
  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!validPassword) return res.status(400).send('Invalid password');

  // Create and Assign JWT Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
