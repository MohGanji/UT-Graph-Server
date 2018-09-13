var User = require('../../models/User');
var constLink = require('../../utils/config').constLink;

exports.renderForgetPaswordPage = async function (req, res) {
  res.render('forget_page.ejs');
};

exports.handleForgetPassword = async function (req, res) {
  let email = req.body.email;
  let user = await User.findOne({ email: email });
  let data = user.username;
  let buff = new Buffer.Alloc(data);
  let base64data = buff.toString('base64');
  const link = constLink + '?user=' + base64data;

  // mail link !
};
