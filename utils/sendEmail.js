const nodemailer = require('nodemailer');
const email = require('../mail/');

module.exports = async function (mailOptions) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email.user,
      pass: email.password
    }
  });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
