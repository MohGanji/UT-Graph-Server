var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');


router.post('/', [
  check('data.password').isLength({ min: 5 }),
  check('asd', "tool bayad....").isLength({ min: 5 }),
  check('data.username').custom(async value => {
    let user = await User.findOne({ username: value });
    if (user) {
      throw new Error('user already exists');
    }
  })
], async function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  console.log(validationResult(req).array());
  let username = req.body.data.username;
  let newUser = req.body.data;

  try {
    await User.create(newUser)
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

  return res.status(200).send();
});

module.exports = router;
