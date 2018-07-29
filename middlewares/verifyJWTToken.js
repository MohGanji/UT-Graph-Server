var jwt = require('jsonwebtoken');
var config = require('../utils/config');

function verifyJWTToken(req, res, next) {

  let token = req.body.token;
  let secret = config.secret;

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return res.status(401).end();
    }
    else {
      req.username = decoded.username;
      return next();
    }
  });
}

module.exports = {
  verifyJWTToken: verifyJWTToken
};