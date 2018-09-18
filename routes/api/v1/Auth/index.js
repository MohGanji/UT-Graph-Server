var express = require('express');
var router = express.Router();
var authController = require('../../../../controllers/auth/authController');
var email = require('../../../../mail/');
const nodemailer = require('nodemailer');

router.post('/refreshToken', authController.refreshToken);
router.post('/validateToken', authController.validateAccessToken);
router.get('/test', async function (req, res) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email.user,
      pass: email.password
    }
  });
  let mailOptions = {
    from: email.user,
    to: 'arman.magician@gmail.com',
    subject: 'test4',
    html: `<p align="right" dir="right">با سلام</p>
    <p align="right" dir="right">برای فعالسازی حساب کاربری خود <a href="http://localhost:3000">اینجا</a> را کلیک کنید</p>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).send();
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
module.exports = router;
