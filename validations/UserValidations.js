var User = require('../models/User');
const bcrypt = require('bcrypt');
const { check } = require('express-validator/check');

exports.login = [
  check('data.username').custom(async (value, { req }) => {
    let user = await User.findOne({ username: value });
    if (user) {
      let isPasswordCorrect = await bcrypt.compare(
        req.body.data.password,
        user.password
      );
      if (!isPasswordCorrect || user.active === false) {
        throw new Error('نام کاربری یا رمز عبور اشتباه است!');
      }
    } else {
      throw new Error('نام کاربری یا رمر عبور اشتباه است!');
    }
  })
];

exports.register = [
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
      throw new Error('نام کاربری وارد شده قبلا در سیستم ثبت شده است!');
    }
  })
];
