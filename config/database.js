const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // database: process.env.DB_CONNECTION,
  database: 'mongodb://localhost:27017/tagify',
  secret: 'yoursecret',
};
