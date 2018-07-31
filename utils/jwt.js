var jwt = require('jsonwebtoken');
var config = require('./config');

function encode(payload, expireIn) {
  return jwt.sign(payload, config.secret, expireIn);
}

async function decode(token) {
  let decoded = await jwt.verify(token, config.secret).catch((err) => { throw err; });
  return decoded;
}

module.exports = {
  encode: encode,
  decode: decode
};