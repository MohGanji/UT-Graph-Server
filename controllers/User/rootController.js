var User = require('../../models/User');
const bcrypt = require('bcrypt');
const config = require('../../utils/config');

exports.get_users = async function (req, res) {
  try {
    var users = await User.find({});
  } catch (err) {
    return res.status(500).send();
  }
  var mappedUsers = await Promise.all(
    users.map(async function (user) {
      return user.toJSON();
    })
  );
  res.status(200).send(JSON.stringify({ data: mappedUsers }));
};

exports.edit_profile = async function (req, res) {
  let username = req.username;
  let user = await User.findOne({ username: username });
  let updatedUser = req.body.data;

  if (updatedUser.password === '') {
    updatedUser.password = user.password;
  } else {
    updatedUser.password = await bcrypt.hash(
      updatedUser.password,
      config.saltRounds
    );
  }

  if (updatedUser.image === '') {
    updatedUser.image = user.image;
  }

  await User.findOneAndUpdate({ username: username }, { $set: updatedUser });
  return res.status(200).send();
};

exports.activeOrDeactive = async function (req, res) {
  let username = req.username;
  let activationStatus = req.params.activationStatus;
  let user = await User.findOne({ username: username });

  if (activationStatus === 'active') {
    user.active = true;
  } else if (activationStatus === 'deactive') {
    user.active = false;
  } else {
    return res.status(404).send();
  }
  await user.save();

  return res.status(200).send();
};

exports.get_image_by_username = async function (req, res) {
  // wtf is this?? why???! why???!
  // TODO: DELETE THIS FUNCTION
  let username = req.params.id;

  try {
    var user = await User.findOne({ username: username });
  } catch (err) {
    return res.status(500).send();
  }

  if (user) {
    return res
      .status(200)
      .send(JSON.stringify({ image: process.env.PUBLIC_URL + user.image }));
  } else {
    return res.status(404).send();
  }
};
