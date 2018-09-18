var mongoose = require('mongoose');
var EmailValidation = require('../../models/EmailValidation');
var User = require('../../models/User');

exports.validateEmail = async function (req, res) {
  try {
    let hash = req.params.hash;
    let emailValidation = await EmailValidation.findOne({ hash: hash });
    let userId = await mongoose.Types.ObjectId(emailValidation.user);
    let user = await User.findById(userId);
    user.active = true;
    await user.save();
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(200).send();
};
