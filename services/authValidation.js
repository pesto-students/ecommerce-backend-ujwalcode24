const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { ROLE } = require('../models/Role');

function userAuthentication(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

function adminAuthorization(req, res, next) {
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(401).send('Access Denied');
  }
  next();
}

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6),
    role: Joi.string().min(4).valid(ROLE.USER, ROLE.ADMIN).uppercase(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  return schema.validate(data);
};

module.exports = {
  userAuthentication,
  adminAuthorization,
  registerValidation,
  loginValidation,
};
