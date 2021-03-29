const express = require('express');
const User = require('../models/User');

const router = express.Router();

const { userAuthentication, adminAuthorization } = require('./validateAuth');

router.get('/', userAuthentication, async (req, res) => {
  let userDetails;
  await User.findById(req.user._id, (err, user) => {
    userDetails = user;
  });

  res.json({
    product: {
      user: req.user._id,
      userDetails: userDetails,
      title: 'Product 1',
      description: 'This is a good product',
    },
  });
});

router.post('/', userAuthentication, adminAuthorization, (req, res) => {
  res.send('post products here');
});

router.get('/id', userAuthentication, (req, res) => {
  res.send('product');
});

router.patch('/id', userAuthentication, adminAuthorization, (req, res) => {
  res.send('change product details here');
});

router.put('/id', userAuthentication, adminAuthorization, (req, res) => {
  res.send('update product details here');
});

module.exports = router;
