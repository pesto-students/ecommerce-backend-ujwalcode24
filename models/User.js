const mongoose = require('mongoose');
const { ROLE } = require('./Role');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 6,
    max: 255,
  },
  role: {
    type: String,
    min: 4,
    default: ROLE.USER,
    enum: [ROLE.USER, ROLE.ADMIN],
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
