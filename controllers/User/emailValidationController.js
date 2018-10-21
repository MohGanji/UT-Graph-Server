var mongoose = require('mongoose');
var EmailValidation = require('../../models/EmailValidation');
var User = require('../../models/User');

exports.validateEmail = async function (req, res) {
  try {
    let hash = req.params.hash;
    let emailValidation = await EmailValidation.findOne({ hash: hash });
    if (!emailValidation) {
      return res.render('result_page.ejs', {
        text: 'لینک فعال سازی حساب کاربری شما معتبر نمیباشد'
      });
    }
    let userId = await mongoose.Types.ObjectId(emailValidation.user);
    await User.findByIdAndUpdate(userId, { $set: { active: true } });
    await emailValidation.remove(); // I'm deleting it!
    res.render('result_page.ejs', {
      text: 'حساب کاربری شما با موفقیت فعال شد',
      header: 'فعالسازی حساب کاربری'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
