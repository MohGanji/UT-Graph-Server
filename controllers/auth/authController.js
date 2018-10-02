var auth = require('../../utils/auth');
var User = require('../../models/User');

exports.refreshToken = async function (req, res) {
  let refreshToken = req.body.refreshToken;
  if (refreshToken !== '') {
    try {
      await auth.validateToken(refreshToken);
    } catch (error) {
      return res.status(401).send();
    }
  }
  let user = await User.findOne({ refreshToken: refreshToken });
  if (!user) {
    return res.status(401).send();
  }
  let accessToken = await auth.createAccessToken(user);
  return res.status(200).send(
    JSON.stringify({
      data: {
        accessToken: accessToken,
        user: await user.toJSON()
      }
    })
  );
};

exports.validateAccessToken = async function (req, res) {
  let token = req.body.accessToken;
  let decoded;
  if (!token) {
    return res.status(401).send();
  }
  try {
    decoded = await auth.validateToken(token);
  } catch (error) {
    return res.status(401).send();
  }
  let user = await User.findOne({ username: decoded.username });
  return res
    .status(200)
    .send(JSON.stringify({ data: { user: await user.toJSON() } }));
};
