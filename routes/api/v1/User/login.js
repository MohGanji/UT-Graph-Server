var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var config = require('../../../../utils/config');
var jwt = require('jsonwebtoken');
var router = express.Router();
const bcrypt = require('bcrypt');

const { check, validationResult } = require('express-validator/check');

var secret = config.secret;

router.post(
  '/',
  [
    check('data.username').custom(async (value, { req }) => {
      let user = await User.findOne({ username: value });
      if (user) {
        let isPasswordCorrect = await bcrypt.compare(
          req.body.data.password,
          user.password,
        );
        if (!isPasswordCorrect) {
          throw new Error('نام کاربری یا رمز عبور اشتباه است!');
        }
      } else {
        throw new Error('نام کاربری یا رمر عبور اشتباه است!');
      }
    }),
  ],
  async function(req, res) {
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
  },
);

module.exports = router;
