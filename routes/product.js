const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { productValidation } = require('../services/productValidation');

const router = express.Router();

const {
  userAuthentication,
  adminAuthorization,
} = require('../services/authValidation');

router.post('/', userAuthentication, adminAuthorization, async (req, res) => {
  // Validate user data
  const { error } = productValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const productExists = await Product.findOne({ name: req.body.name });
  if (productExists) return res.status(400).send('Product already exist');

  // Create new user
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    quantity: req.body.quantity,
    rating: req.body.rating,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  });

  // Save new user
  try {
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.send(400).send(err);
  }
});

router.get('/', userAuthentication, (req, res) => {
  Product.find((err, products) => res.json(products));
});

router.get('/:id', userAuthentication, (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err || product === null) res.status(404).send('Product not found.');
    else res.status(200).json(product);
  });
});

router.delete('/:id', userAuthentication, adminAuthorization, (req, res) => {
  Product.remove({ _id: req.params.id }, (err, product) => {
    if (err) res.status(404).send('Product not found.');
    else res.status(200).send('Product Removed');
  });
});

router.patch(
  '/:id',
  userAuthentication,
  adminAuthorization,
  async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      if (req.body.name) product.name = req.body.name;
      await product.save();
      res.status(200).send(product);
    } catch {
      res.status(404).send('Product not found');
    }
  }
);

module.exports = router;
