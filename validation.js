// Validation
const Joi = require('joi');
const { ROLE } = require('./role');

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
