const jwt = require('jsonwebtoken');
const { ROLE } = require('../role');

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

module.exports = { userAuthentication, adminAuthorization };
