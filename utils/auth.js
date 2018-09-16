var jwt = require('jsonwebtoken');
var config = require('./config');

exports.createAccessToken = async function (user) {
  let accessToken = await jwt.sign(
    {
      username: user.username
    },
    config.secret,
    { expiresIn: config.accessTokenExpireTime }
  );
  return accessToken;
};

exports.createRefreshToken = async function () {
  let refreshToken = await jwt.sign(
    {
      type: 'refresh'
    },
    config.secret
  );
  return refreshToken;
};

exports.validateToken = async function (token) {
  return jwt.verify(token, config.secret);
};
