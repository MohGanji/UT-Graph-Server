var config = require('../../utils/config');
var jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator/check');

var secret = config.secret;

exports.login = async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let username = req.body.data.username;
  let authenticationObj = {
    data: {
      token: '',
    },
  };
  authenticationObj.data.token = jwt.sign(
    {
      username: username,
    },
    secret,
  );
  return res.json(authenticationObj);
};
