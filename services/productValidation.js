const Joi = require('joi');

// Register Validation
const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(1024).required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required().uri().required(),
    quantity: Joi.number().required(),
    rating: Joi.number().min(0).max(5),
    category: Joi.string().max(512).required(),
    thumbnails: Joi.array().max(5),
  });

  return schema.validate(data);
};

module.exports = {
  productValidation,
};
