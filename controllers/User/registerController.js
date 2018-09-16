var User = require('../../models/User');
var isAdmin = require('../../utils/isAdmin');
const bcrypt = require('bcrypt');
const config = require('../../utils/config');
const { validationResult } = require('express-validator/check');

exports.registerUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let username = req.body.data.username;
  let password = req.body.data.password;
  let newUser = req.body.data;

  newUser.password = await bcrypt.hash(password, config.saltRounds);

  if (isAdmin(username)) {
    newUser.role = 'ADMIN';
  } else {
    newUser.role = 'USER';
  }
  newUser.image = 'defaultProfile.svg';
  try {
    await User.create(newUser);
  } catch (err) {
    return res.status(500).send();
  }

  return res.status(200).send();
};
