const express = require('express');
const User = require('../models/User');

const router = express.Router();

const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
  let userDetails;
  await User.findById(req.user._id, (err, user) => {
    console.log(user);
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

module.exports = router;
