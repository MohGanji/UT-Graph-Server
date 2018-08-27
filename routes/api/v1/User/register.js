var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');


router.post('/', [
  check('data.password', "password is too short!").isLength({ min: 6 }),
  check('data.password', "password is too long!").isLength({ max: 32 }),
  check('data.email', "email isnot valid!").isEmail(),
  check('data.email').custom(async value => {
    let user = await User.findOne({ email: value });
    if (user) {
      throw new Error('email already exists');
    }
  }),
  check('data.username').custom(async value => {
    let user = await User.findOne({ username: value });
    if (user) {
      throw new Error('username already exists');
    }
  })
], async function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("error");
    return res.status(422).json({ errors: errors.array() });
    // return res.json({ errors: errors.array() });
  }
  console.log(validationResult(req).array());
  let username = req.body.data.username;
  let newUser = req.body.data;
  // throw new Error('userhyfyfuf already exists');

  try {
    await User.create(newUser)
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

  return res.status(200).send();
});

module.exports = router;
