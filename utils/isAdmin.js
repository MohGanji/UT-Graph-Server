const admins = ['mahdi.jahed', 'hadi.hojjat'];

module.exports = username => {
  return admins.find(function (element) {
    return element === username;
  });
};
