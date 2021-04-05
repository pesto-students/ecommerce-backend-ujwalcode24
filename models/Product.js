const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 1024,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  category: {
    type: String,
    max: 512,
    required: true,
  },
  thumbnails: {
    type: Array,
    default: [],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
  },
});

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Product', productSchema);
