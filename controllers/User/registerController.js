var User = require('../../models/User');
var EmailValidation = require('../../models/EmailValidation');
var isAdmin = require('../../utils/isAdmin');
const bcrypt = require('bcrypt');
const config = require('../../utils/config');
const { validationResult } = require('express-validator/check');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const email = require('../../mail/');

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
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email.user,
        pass: email.password
      }
    });
    let mailOptions = {
      from: email.user,
      to: userEmail,
      subject: 'فعال سازی حساب کاربری UT Graph',
      html: `<p align="right" dir="right">با سلام</p> 
      <p align="right" dir="right">برای فعالسازی حساب کاربری خود <a href="http://localhost:3000/email-validation/${userHash}">اینجا</a> را کلیک کنید</p>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send();
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
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
