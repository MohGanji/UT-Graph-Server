const normalizeUser = user => {
  return {
    id: user._id,
    name: user.name,
    sid: user.sid
  };
};

module.exports = normalizeUser;
