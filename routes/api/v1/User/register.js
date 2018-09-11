var express = require('express');
var mongoose = require('../../../../utils/mongo');
var User = require('../../../../models/User');
var isAdmin = require('../../../../utils/isAdmin');
var router = express.Router();
const bcrypt = require('bcrypt');
const config = require('../../../../utils/config');

const { check, validationResult } = require('express-validator/check');

router.post(
  '/',
  [
    check('data.password')
      .isLength({ min: 6 })
      .withMessage('رمز عبور باید حداقل ۶ کاراکتر باشد!'),
    check('data.password')
      .isLength({ max: 32 })
      .withMessage('رمز عبور انتخاب شده بلند تر از ۳۲ کراکتر است!'),
    check('data.username')
      .not()
      .isEmpty()
      .withMessage('فیلد نام کاربری نمی تواند خالی باشد!'),
    check('data.email', 'ایمیل وارد شده معتبر نمی باشد!').isEmail(),
    check('data.email').custom(async value => {
      let user = await User.findOne({ email: value });
      if (user) {
        throw new Error('ایمیل وارد شده قبلا در سیستم ثبت شده است!');
      }
    }),
    check('data.username').custom(async value => {
      let user = await User.findOne({ username: value });
      if (user) {
        password;
        throw new Error('نام کاربری وارد شده قبلا در سیستم ثبت شده است!');
      }
    }),
  ],
  async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let username = req.body.data.username;
    let password = req.body.data.password;
    let newUser = req.body.data;
<<<<<<< HEAD
    newUser.role;
    if (isAdmin(username)) newUser.role = 'ADMIN';
    else newUser.role = 'USER';
    // console.log(newUser.role);
=======

    newUser.password = await bcrypt.hash(password, config.saltRounds);

    if (isAdmin(username)) {
      newUser.role = 'ADMIN';
    } else {
      newUser.role = 'USER';
    }
>>>>>>> 4481d55a31f7ec91be1c6b0a01f06331252d1756
    newUser.image = 'default.jpg';
    try {
      await User.create(newUser);
    } catch (err) {
      return res.status(500).send();
    }

    return res.status(200).send();
  },
);

module.exports = router;
