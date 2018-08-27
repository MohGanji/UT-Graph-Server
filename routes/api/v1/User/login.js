var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var config = require('../../../../utils/config');
var jwt = require('jsonwebtoken');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');

var secret = config.secret;

router.post('/', [
  check('data.username').custom(async (value, { req }) => {
    let user = await User.findOne({ username: value });
    if (!user) {
      throw new Error('username not found!');
    }
    if (user.password != req.body.data.password) {
      throw new Error('password is incorrect!');
    }
  }),
], async function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("error");
    return res.status(422).json({ errors: errors.array() });
  }
  console.log(validationResult(req).array());

  var username = req.body.data.username;
  var password = req.body.data.password;

  try {
    var user = await User.findOne({
      username: username,
      password: password,
    })
  } catch (err) {
    res.status(500).send();
  }

  if (!user) {
    return res.status(404).send();
  } else {
    var authenticationObj = {
      data: {
        token: '',
      },
    };
    authenticationObj.data.token = jwt.sign(
      {
        username: username,
      },
      secret,
      { expiresIn: 60 * 60 },
    );
    return res.json(authenticationObj);
  }
});

module.exports = router;
