var User = require('../../models/User');
var EmailValidation = require('../../models/EmailValidation');
var isAdmin = require('../../utils/isAdmin');
const bcrypt = require('bcrypt');
const config = require('../../utils/config');
const { validationResult } = require('express-validator/check');
const uuid = require('uuid');
const email = require('../../mail/');
var sendEmail = require('../../utils/sendEmail');

exports.registerUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let username = req.body.data.username;
  let password = req.body.data.password;
  let userEmail = req.body.data.email;
  let newUser = req.body.data;

  newUser.password = await bcrypt.hash(password, config.saltRounds);

  if (isAdmin(username)) {
    newUser.role = 'ADMIN';
  } else {
    newUser.role = 'USER';
  }
  newUser.image = 'defaultProfile.svg';
  try {
    let userHash = await uuid.v4();
    let mailOptions = {
      from: email.user,
      to: userEmail,
      subject: 'فعال سازی حساب کاربری UT Graph',
      html: `<p align="right" dir="right">با سلام</p> 
      <p align="right" dir="right">برای فعالسازی حساب کاربری خود 
      <a href="${process.env.URL}/api/v1/user/email-validation/${userHash}">
      اینجا</a> را کلیک کنید</p>
      <p align="right" dir="right">در صورتی که لینک بالا کار نمیکند لینک زیر را در مروگر خود کپی کرده و وارد شوید</p>
      <a href="${process.env.URL}/api/v1/user/email-validation/${userHash}">
      ${process.env.URL}/api/v1/user/email-validation/${userHash}</a>`
    };
    sendEmail(mailOptions);
    let user = await User.create(newUser);
    await EmailValidation.create({
      user: user._id,
      hash: userHash
    });
  } catch (err) {
    return res.status(500).send();
  }

  return res.status(200).send();
};
