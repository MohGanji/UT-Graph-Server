var auth = require('../utils/auth');

module.exports = async function (req, res, next) {
  let token = req.headers.authorization;
  if (token === '') {
    return res.status(401).send();
  }

  let isValid = await auth.validateToken(token);

  if (isValid) {
    req.username = isValid.username;
    return next();
  } else {
    return res.status(401).send();
  }
};
