let User = require('../../models/User');
let ResetPasswordRequest = require('../../models/ResetPasswordReuest');
let uuid = require('uuid');
let email = require('../../mail/');
let sendEmail = require('../../utils/sendEmail');
let bcrypt = require('bcrypt');
let config = require('../../utils/config');

exports.renderResetPaswordPage = async function (req, res) {
  try {
    let hash = req.params.hash;
    let resetPasswordRequest = await ResetPasswordRequest.findOne({
      hash: hash
    });
    if (!resetPasswordRequest) {
      return res.render('result_page.ejs', {
        text: 'لینک بازیابی رمز عبور شما معتبر نمیباشد',
        header: 'بازیابی رمز عبور'
      });
    }
    let userId = resetPasswordRequest.user;
    await resetPasswordRequest.remove(); // i'm deleting it!
    res.render('forget_page.ejs', { userId: userId });
  } catch (error) {
    return res.status(500).send();
  }
};

exports.handleResetPassword = async function (req, res) {
  try {
    let userId = req.body.userId;
    let password = req.body.password;
    password = await bcrypt.hash(password, config.saltRounds);
    await User.findByIdAndUpdate(userId, { $set: { password: password } });
    res.render('result_page.ejs', {
      text: 'رمز عبور شما با موفقیت تغییر یافت'
    });
  } catch (error) {
    return res.status(500).send();
  }
};

exports.submitNewResetRequest = async function (req, res) {
  try {
    let userEmail = req.body.data.email;

    let user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send();
    }

    let previousRequest = await ResetPasswordRequest.findOne({ user: user });
    let hash;
    if (previousRequest) {
      hash = previousRequest.hash;
    } else {
      hash =
        (await Buffer.from(userEmail).toString('base64')) + (await uuid.v4());
      await ResetPasswordRequest.create({ user: user, hash: hash });
    }
    let mailOptions = {
      from: email.user,
      to: userEmail,
      subject: 'بازیابی رمز عبور سایت UT Graph',
      html: `<p align="right" dir="right">با سلام</p> 
        <p align="right" dir="right">برای بازیابی رمز عبور خود 
        <a href="${process.env.URL}/api/v1/user/reset-password/${hash}">
        اینجا</a> را کلیک کنید</p>
        <p align="right" dir="right">اگر لینک بالا کار نمیکند آدرس زیر را در مرورگر خود کپی کرده و وارد شوید<p>
        <a href="${process.env.URL}/api/v1/user/reset-password/${hash}">
        ${process.env.URL}/api/v1/user/reset-password/${hash}</a>`
    };
    await sendEmail(mailOptions);
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(200).send();
};
