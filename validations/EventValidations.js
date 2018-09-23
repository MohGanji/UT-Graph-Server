const { check } = require('express-validator/check');
var User = require('../models/User');

exports.createEvent = [
  check('data.title', 'نام رویداد باید حداقل ۶ کاراکتر باشد!').isLength({
    min: 6
  }),
  check('data.title', 'نام رویداد بلندتر از ۶۴ کاراکتر است!').isLength({
    max: 64
  }),
  check(
    'data.description',
    'توضیحات رویداد باید حداکثر ۵۰۰۰ کاراکتر باشد!'
  ).isLength({ max: 5000 }),
  check('req.username').custom(async (value, { req }) => {
    let user = await User.findOne({ username: req.username });
    if (!user) {
      throw new Error('نام کاربری وارد شده یافت نشد!');
    }
  }),
  check('data.capacity', 'فیلد ظرفیت نمیتواند خالی باشد!')
    .not()
    .isEmpty(),
  check('data.beginTime', 'فیلد تاریخ شروع رویداد نمی تواند خالی باشد!')
    .not()
    .isEmpty(),
  check('data.endTime', 'فیلد تاریخ پایان رویداد نمی تواند خالی باشد!')
    .not()
    .isEmpty()
];
